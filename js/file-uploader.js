document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");

    dropZoneElement.addEventListener("click", (e) => {
        inputElement.click();
    });

    inputElement.addEventListener("change", (e) => {
        if (inputElement.files.length) {
            perfdb.onPreUpload();
            perfdb.onUploading(inputElement.files[0]); 
            perfdb.onPostUpload();
        }
        inputElement.value = null;
    });

    dropZoneElement.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].forEach((type) => {
        dropZoneElement.addEventListener(type, (e) => {
            dropZoneElement.classList.remove("drop-zone--over");
        });
    });

    dropZoneElement.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZoneElement.classList.remove("drop-zone--over");

        if (e.dataTransfer.files.length) {
            inputElement.files = e.dataTransfer.files;
            perfdb.onPreUpload();
            perfdb.onUploading(inputElement.files[0]); 
            perfdb.onPostUpload();
        }
        inputElement.value = null;
    });
});
