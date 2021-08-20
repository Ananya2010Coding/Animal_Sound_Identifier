function startRecognizing(){
    navigator.mediaDevices.getUserMedia({audio: true});
    identify = ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/8WClshAdb/model.json', modelReady);
}

function modelReady(){
    identify.classify(gotResults);
}

function gotResults(error , results){
    if(error){
        console.error(error);
    }
    if(results){
        console.log(results);
    }

    no_r = Math.floor(Math.random()*255) + 1;
    no_g = Math.floor(Math.random()*255) + 1;
    no_b = Math.floor(Math.random()*255) + 1;

    document.getElementById("result_sound").innerHTML = 'I can HEAR a - ' + results[0].label;
    document.getElementById("accuracy").innerHTML = 'Accuracy - ' + (results[0].confidence*100).toFixed(2)+'%';

    document.getElementById("result_sound").style.color = "rgb("+no_b+" , "+no_r+" , "+no_b+")";
    document.getElementById("accuracy").style.color = "rgb("+no_b+" , "+no_r+" , "+no_b+")";

    bird = 'Bird.png';
    cat = 'Cat.png';
    dog = 'Dog.png';
    tiger = 'Tiger.png';
    idk = 'I_dont_know.png';

    if(results[0].label == 'Background Noise'){
        document.getElementById("listening").src = idk;
    }
    else if(results[0].label == 'Dog'){
        document.getElementById("listening").src = dog;
    }
    else if(results[0].label == 'Cat'){
        document.getElementById("listening").src = cat;
    }
    else if(results[0].label == 'Bird'){
        document.getElementById("listening").src = bird;
    }
    else{
        document.getElementById("listening").src = tiger;
    }
}