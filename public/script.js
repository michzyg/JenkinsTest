document.addEventListener('DOMContentLoaded', () => {
    const number1Input = document.getElementById('number1');
    const number2Input = document.getElementById('number2');
    const addButton = document.getElementById('add');
    const subtractButton = document.getElementById('subtract');
    const multiplyButton = document.getElementById('multiply');
    const divideButton = document.getElementById('divide');
    const resultElement = document.getElementById('result');

    // Function to perform calculation
    async function calculate(operation) {
        const a = number1Input.value;
        const b = number2Input.value;

        // Validate inputs
        if (a === '' || b === '') {
            resultElement.textContent = 'Please enter both numbers';
            return;
        }

        try {
            const response = await fetch('/api/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ operation, a, b })
            });

            const data = await response.json();
            
            if (response.ok) {
                resultElement.textContent = data.result;
            } else {
                resultElement.textContent = data.error || 'An error occurred';
            }
        } catch (error) {
            resultElement.textContent = 'Error connecting to server';
            console.error('Error:', error);
        }
    }

    // Add event listeners to buttons
    addButton.addEventListener('click', () => calculate('add'));
    subtractButton.addEventListener('click', () => calculate('subtract'));
    multiplyButton.addEventListener('click', () => calculate('multiply'));
    divideButton.addEventListener('click', () => calculate('divide'));
});