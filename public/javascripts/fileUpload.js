const rootStyles = window.getComputedStyle(document.documentElement);
if(rootStyles.getPropertyValue('--book-cover-width-large') != null && rootStyles.getPropertyValue('--book-cover-width-large') !== '' ){
    ready()
} 
else{
    document.getElementById('main-css').addEventListener('load', ready());
}



function ready(){
    const coverWidth = rootStyles.getPropertyValue('--book-cover-width-large');
    const coverAspectRatio = rootStyles.getPropertyValue('--book-cover-aspect-ration');
    const coverHeight = coverWidth / coverAspectRatio;
    document.addEventListener('DOMContentLoaded', function() {
        FilePond.registerPlugin(FilePondPluginImagePreview);
        FilePond.registerPlugin(FilePondPluginImageResize);
        FilePond.registerPlugin(FilePondPluginFileEncode);
        FilePond.setOptions({
            stylePanelAspectRatio: 1/coverAspectRatio,
            imageResizeTargetWidth: coverWidth,
            imageResizeTargetHeight:coverHeight,
        })
        const inputElement = document.querySelector('input[type="file"]');
        const pond = FilePond.create(inputElement);
        FilePond.parse(document.body);
      });  
    
      //set up the plugin for uploading files
}

// document.addEventListener('DOMContentLoaded', function() {
//     FilePond.registerPlugin(FilePondPluginImagePreview);
//     FilePond.registerPlugin(FilePondPluginImageResize);
//     FilePond.registerPlugin(FilePondPluginFileEncode);
//     FilePond.setOptions({
//         stylePanelAspectRatio: 150/100,
//         imageResizeTargetWidth: 100,
//         imageResizeTargetHeight:150,
//     })
//     const inputElement = document.querySelector('input[type="file"]');
//     const pond = FilePond.create(inputElement);
//     FilePond.parse(document.body);
//   });  

//   //set up the plugin for uploading files