const imageId = 'loaded-image';
const getImage = (id) => document.getElementById(id);

function handleFileSelect() {
    const loadedImage = getImage(imageId);
    const file = document.getElementById('image-uploader-input').files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
        loadedImage.src = reader.result;
    }
    if (file) {
        reader.readAsDataURL(file); // reads the data as a URL
        document.getElementById(imageId).style.display = 'block';
    } else {
        loadedImage.src = '';
    }
}

function classify() {
    const file = document.getElementById('image-uploader-input').files[0];
    // The image we want to classify
    const loadedImage = getImage(imageId);

    if(!file) {
        return alert('You should load image first');
    }

    const classificationResult = document.getElementById('classification-result');

    const classificationProbability = document.getElementById('classification-prob');

    // Initialize the Image Classifier method with MobileNet
    const classifier = ml5.imageClassifier('MobileNet', () => {
        console.log('Model Loaded!');
    });

    // Make a prediction with the selected image
    // This will return an array with a default of 10 options with their probabilities
    classifier.predict(loadedImage, (err, results) => {
        classificationResult.innerText = results[0].className;
        classificationProbability.innerText = results[0].probability.toFixed(4);
    });
}

function reset() {
    const loadedImage = getImage(imageId);
    loadedImage.src = '';
    document.getElementById('classification-result').innerText = '';
    document.getElementById('classification-prob').innerText = '';
    document.getElementById('image-uploader-input').value = '';
}