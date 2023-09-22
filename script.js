<script>
// Add click event listener to the upload div
document.getElementById('uploadDiv').addEventListener('click', function() {
    // Trigger click on the hidden file input
    document.getElementById('fileInput').click();
});

// Display selected image inside the upload div
document.getElementById('fileInput').addEventListener('change', function() {
    const uploadDiv = document.getElementById('uploadDiv');
    const fileInput = this;

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            uploadDiv.style.backgroundImage = `url('${e.target.result}')`;
            uploadDiv.style.backgroundSize = 'cover';
            uploadDiv.style.backgroundPosition = 'center';
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
});


document.getElementById('convertBtn').addEventListener('click', function() {
const fileInput = document.getElementById('fileInput');
const downloadLink = document.getElementById('downloadLink');
const selectedFileType = document.getElementById('fileTypeSelect').value;

if (fileInput.files.length > 0) {
const file = fileInput.files[0];
const reader = new FileReader();

reader.onload = function(e) {
    const img = new Image();
    img.src = e.target.result;

    img.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = `converted.${selectedFileType}`;
            downloadLink.style.display = 'block'; // Show the download link
        }, `image/${selectedFileType}`);
    };
};

reader.readAsDataURL(file);
} else {
alert('Please select an image to convert.');
}
});

</script>