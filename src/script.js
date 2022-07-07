document.addEventListener('DOMContentLoaded', () => {
    const urlBar = document.querySelector('#url-bar');
    const urlButton = document.querySelector('#url-button');

    function switchPage(value) {
        let httpRemoveRegex = new RegExp(/(^\w+:|^)\/\//)
        let url = value.replace(httpRemoveRegex, '');
        let finalUrl = url;

        if (finalUrl.split('.').length <= 1 && !finalUrl.includes(':')) {
            finalUrl += '.com'
        }

        if (url != '') {
            window.location = `http://${finalUrl}`;
        }
    }

    urlButton.addEventListener('click', () => {
        switchPage(urlBar.value);
    })

    urlBar.addEventListener('keydown', (event) => {
        let isEnterKey = event.key.toLowerCase() == 'enter'

        if (isEnterKey) {
            switchPage(urlBar.value);
        }
    })
})  
