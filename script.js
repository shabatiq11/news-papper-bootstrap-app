const fileUploaded = document.querySelector(".fileUploaded").addEventListener("change", handleFileUpload);
function handleFileUpload(event) {
    const files = event.target.files;
    for (const file of files) {
        processFile(file);
    }
}
function processFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => createImageFromBlob(e.target.result);
    reader.readAsArrayBuffer(file);
}
function createImageFromBlob(arrayBuffer) {
    const blob = new Blob([arrayBuffer]);
    const url = window.URL.createObjectURL(blob);
    const img = new Image();
    img.src = url;
    img.onload = () => resizeImageAndAppendToForm(img);
}
function resizeImageAndAppendToForm(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const desiredWidth = 300;
    const desiredHeight = 300;
    
    canvas.width = desiredWidth;
    canvas.height = desiredHeight;
    ctx.drawImage(img, 0, 0, desiredWidth, desiredHeight);
    const dataURL = canvas.toDataURL('image/jpeg', 0.7);
    appendImageAndHiddenInput(dataURL);
}
function appendImageAndHiddenInput(dataURL) {
    const domImage = document.createElement("img");
    domImage.src = dataURL;
    domImage.width = 150;
    domImage.height = 100;

    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'imageData';
    hiddenInput.value = dataURL;

    const form = document.querySelector('.myCustomForm');
    form.append(domImage);
    form.appendChild(hiddenInput);
}




// fileUploaded.addEventListener("change", (event) => {
//     const files = event.target.files;
//     for (const file of files) {
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             const blob = new Blob([e.target.result]);
//             const url = window.URL.createObjectURL(blob);
//             const img = new Image();
//             img.src = url;
//             img.onload = function() {
//                 const canvas = document.createElement('canvas');
//                 const ctx = canvas.getContext('2d');
//                 const desiredWidth = 300;
//                 const desiredHeight = 300;
//                 canvas.width = desiredWidth;
//                 canvas.height = desiredHeight;
//                 ctx.drawImage(img, 0, 0, desiredWidth, desiredHeight);
//                 const dataURL = canvas.toDataURL('image/jpeg', 0.7); 
//                 const hiddenInput = document.createElement('input');
//                 hiddenInput.type = 'hidden';
//                 hiddenInput.name = 'imageData';
//                 hiddenInput.value = dataURL;
//                 const domImage = document.createElement("img")
//                 domImage.src = dataURL
//                 domImage.height = 100
//                 domImage.width = 150
//                 const form = document.querySelector('.myCustomForm'); 
//                 form.append(domImage)
//                 form.appendChild(hiddenInput);

//             };
//         };
//         reader.readAsArrayBuffer(file);
//     }
// })



// using Microsoft.AspNetCore.Mvc;
// using System.Drawing;
// using System.Drawing.Imaging;
// using System.IO;
// using System.Threading.Tasks;

// public class ImageController : Controller
// {
//     [HttpPost]
//     public async Task<IActionResult> UploadImage(UploadImageModel model)
//     {
//         if (model.UploadedFile != null && model.UploadedFile.Length > 0)
//         {
//             using (var stream = new MemoryStream())
//             {
//                 await model.UploadedFile.CopyToAsync(stream);
//                 using (var image = new Bitmap(stream))
//                 {
//                     var resizedImage = ResizeImage(image, 300, 300);
//                     string base64Image = ImageToBase64(resizedImage, ImageFormat.Jpeg);
//                     return Json(new { imageData = base64Image });
//                 }
//             }
//         }
//         return BadRequest("No file uploaded");
//     }
//     private Bitmap ResizeImage(Image image, int width, int height)
//     {
//         var resizedBitmap = new Bitmap(width, height);
//         using (var graphics = Graphics.FromImage(resizedBitmap))
//         {
//             graphics.DrawImage(image, 0, 0, width, height);
//         }
//         return resizedBitmap;
//     }

//     private string ImageToBase64(Bitmap image, ImageFormat format)
//     {
//         using (var ms = new MemoryStream())
//         {
//             image.Save(ms, format);
//             return Convert.ToBase64String(ms.ToArray());
//         }
//     }
// }