
export function search(input) {
    

    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            console.log('Enter pressed');
        }
    });
}
