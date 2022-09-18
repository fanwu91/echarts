document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");

    dropZoneElement.addEventListener("click", (e) => {
        inputElement.click();
    });

    inputElement.addEventListener("change", (e) => {
        if (inputElement.files.length) {
            console.log(`file uplaoded: file length: ${inputElement.files.length}`);
            perfdb.onUpload(inputElement.files[0]); 
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
            perfdb.onUpload(inputElement.files[0]);
        }
    });
});
