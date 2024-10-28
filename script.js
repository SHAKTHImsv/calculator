let outputScreen = document.getElementById("outputscreen");

function display(num) {
    outputScreen.value += num;
}

function calculate() {
    try {
        outputScreen.value = eval(outputScreen.value);
        speak(outputScreen.value); // Speak the result
    } catch (err) {
        alert("Invalid");
    }
}

function Clear() {
    outputScreen.value = "";
}

function del() {
    outputScreen.value = outputScreen.value.slice(0, -1);
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}

// Voice recognition functionality
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false;
recognition.interimResults = false;

function startListening() {
    recognition.start();
}

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase(); // Convert to lowercase for easier matching
    console.log(transcript); // Debugging line to see the spoken command

    // Parse the command
    const words = transcript.split(" ");
    
    // Handle multiplication
    if (words.includes("multiply") || words.includes("times")) {
        const index = words.indexOf("multiply") !== -1 ? words.indexOf("multiply") : words.indexOf("times");
        const num1 = parseFloat(words[index - 1]);
        const num2 = parseFloat(words[index + 1]);

        if (!isNaN(num1) && !isNaN(num2)) {
            const result = num1 * num2;
            outputScreen.value = result;
            speak(result); // Speak the result
        } else {
            speak("Please say two numbers to multiply.");
        }
    }
    // Handle division
    else if (words.includes("divide") || words.includes("over")) {
        const index = words.indexOf("divide") !== -1 ? words.indexOf("divide") : words.indexOf("over");
        const num1 = parseFloat(words[index - 1]);
        const num2 = parseFloat(words[index + 1]);

        if (!isNaN(num1) && !isNaN(num2)) {
            if (num2 !== 0) {
                const result = num1 / num2;
                outputScreen.value = result;
                speak(result); // Speak the result
            } else {
                speak("Cannot divide by zero.");
            }
        } else {
            speak("Please say two numbers to divide.");
        }
    }
    // Handle percentage
    else if (words.includes("percent") || words.includes("percentage")) {
        const index = words.indexOf("percent") !== -1 ? words.indexOf("percent") : words.indexOf("percentage");
        const num = parseFloat(words[index - 1]);

        if (!isNaN(num)) {
            const result = num / 100; // Calculate percentage
            outputScreen.value = result;
            speak(result); // Speak the result
        } else {
            speak("Please say a number followed by percent.");
        }
    } 
    else {
        // Handle other calculations
        outputScreen.value = transcript; // For direct expressions like "2 + 2"
        calculate(); // Automatically calculate if needed
    }
};

recognition.onerror = (event) => {
    console.error("Error occurred in recognition: " + event.error);
};
