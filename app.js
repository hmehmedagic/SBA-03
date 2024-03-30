// Menu data structure
var menuLinks = [
    { text: 'about', href: '/about' },
    {
        text: 'photo album',
        href: '#',
        subLinks: [
            { text: 'Add Photo', href: '/photo album/addPhoto' },
        ]
    },
    {
        text: 'orders',
        href: '#',
        subLinks: [
            { text: 'new', href: '/orders/new' },
            { text: 'pending', href: '/orders/pending' },
            { text: 'history', href: '/orders/history' },
        ]
    },
    {
        text: 'account',
        href: '#',
        subLinks: [
            { text: 'log in', href: '/account/profile' },
            { text: 'sign out', href: '/account/signout' },
        ]
    },
];

function displayLoginModal() {
    // Fetch the content of login.html
    fetch('login.html')
        .then(response => response.text())
        .then(html => {
            // Insert the fetched HTML content into the modal container
            const modalContainer = document.getElementById('myModal');
            modalContainer.innerHTML = html;

            // Display the modal
            modalContainer.style.display = 'block';

            const closeButton = modalContainer.querySelector('.close');
            if (closeButton) {
                closeButton.addEventListener('click', closeModal);
            }

        })
        .catch(error => {
            console.error('Error fetching login.html:', error);
        });
}

function closeModal() {
    const modalContainer = document.querySelector('#myModal');
    modalContainer.style.display = 'none';
}

const buildSubmenu = (subLinks) => {
    subMenuEl.innerHTML = '';

    const fragment = new DocumentFragment();

    subLinks.forEach(link => {
        const anchor = document.createElement('a');

        anchor.href = link.href;
        anchor.textContent = link.text;

        fragment.append(anchor);
    });
    subMenuEl.appendChild(fragment);
    subMenuEl.lastChild.style.backgroundColor = 'var(--sub-menu-last-bg)';

    subMenuEl.lastElementChild.addEventListener('mouseover', function() {
        this.style.backgroundColor = 'var(--sub-menu-bg)';
    });

    subMenuEl.lastElementChild.addEventListener('mouseout', function() {
        this.style.backgroundColor = 'var(--top-menu-bg)';
    });
};

const mainEl = document.querySelector('main');
mainEl.style.backgroundColor = 'var(--main-bg)';
mainEl.innerHTML = '<h1>Photo Album</h1>';
mainEl.classList.add('flex-ctr');

const topMenuEl = document.querySelector('#top-menu');
topMenuEl.style.height = '100%';
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
topMenuEl.classList.add('flex-around');

menuLinks.forEach(element => {
    const anchor = document.createElement('a');
    anchor.href = element.href;
    anchor.textContent = element.text;
    topMenuEl.appendChild(anchor);
});

const subMenuEl = document.getElementById('sub-menu');
subMenuEl.style.height = '100%';
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
subMenuEl.classList.add('flex-around');
subMenuEl.style.position = 'absolute';
subMenuEl.style.top = '0';

const topMenuLinks = topMenuEl.querySelectorAll('a');

topMenuEl.addEventListener('click', function(event) {
    event.preventDefault();
    if (!event.target.matches('a')) return;
    console.log(event.target.textContent);

    const isActive = event.target.classList.contains('active');
    topMenuLinks.forEach(link => {
        link.classList.remove('active');
    });
    if (!isActive) {
        event.target.classList.add('active');
        if (event.target.textContent !== 'about') {
            subMenuEl.style.top = '100%';

            const linkText = event.target.textContent.toLowerCase();
            const clickedLink = menuLinks.find(link => link.text === linkText);
            if (clickedLink && clickedLink.subLinks) {
                buildSubmenu(clickedLink.subLinks);
            }
        } else {
            // Hide the submenu if ABOUT link is clicked
            subMenuEl.style.top = '0';
            subMenuEl.innerHTML = ''; // Clears submenu contents
            mainEl.innerHTML = '<p>The purpose of this project is to show DOM manipulation principles</p>'
        }
    } else {
        // Hide the submenu if the clicked link is already active
        subMenuEl.style.top = '0';
        subMenuEl.innerHTML = ''; // Clears submenu contents
        mainEl.innerHTML = '<h1>Photo Album</h1>';
    }
});

subMenuEl.addEventListener('click', function(event) {
    event.preventDefault();
    if (!event.target.matches('a')) return;
    console.log(event.target.textContent);
    const clickedLinkText = event.target.textContent;
    if (clickedLinkText === 'log in') {
        displayLoginModal();
    }
    if (clickedLinkText !== 'about');
    mainEl.innerHTML = '<h1>Photo Album</h1>';

    subMenuEl.style.top = '0';

    topMenuLinks.forEach(link => {
        link.classList.remove('active');
    });
});

document.addEventListener('click', function(event) {
    if (!event.target.closest('#myModal')) {
        closeModal();
    }
});

document.addEventListener('click', function() {
    const emailInput = document.querySelector('.emailInput input');
    const passInput = document.querySelector('.passInput input');
    const loginBtn = document.getElementById('myAccount');

    // Function to validate email format
    function validateEmail(email) {
        return email.length >= 4;
    }

    // Function to validate password length
    function validatePassword(password) {
        return password.length >= 6;
    }

    // Function to display error message
    function showError(inputElement, errorMessage) {
        const errorContainer = inputElement.parentElement.querySelector('.emailError') || inputElement.parentElement.querySelector('.passError');
        errorContainer.textContent = errorMessage;
    }

    // Function to clear error message
    function clearError(inputElement) {
        const errorContainer = inputElement.parentElement.querySelector('.emailError') || inputElement.parentElement.querySelector('.passError');
        errorContainer.textContent = '';
    }

    // Event listener for email input
    emailInput.addEventListener('input', function() {
        const email = emailInput.value.trim();
        if (!validateEmail(email)) {
            showError(emailInput, 'Email must be at least 4 characters long.');
        } else {
            clearError(emailInput);
        }
    });

    // Event listener for password input
    passInput.addEventListener('input', function() {
        const password = passInput.value.trim();
        if (!validatePassword(password)) {
            showError(passInput, 'Password must be at least 6 characters long.');
        } else {
            clearError(passInput);
        }
    });

    // Event listener for form submission
    loginBtn.addEventListener('click', function(event) {
        const email = emailInput.value.trim();
        const password = passInput.value.trim();

        if (!validateEmail(email)) {
            showError(emailInput, 'Email must be at least 4 characters long.');
            event.preventDefault();
        }

        if (!validatePassword(password)) {
            showError(passInput, 'Password must be at least 6 characters long.');
            event.preventDefault();
        }

        const modalContainer = document.querySelector('#myModal');
        if (validateEmail(email) && validatePassword(password)) {

            //modalContainer.style.display = 'none'; //this removes the images
            modalContainer.innerHTML = ''; //this preserves the images
        }
    });
});

function handleFileSelect(event) {
    const files = event.target.files;
    if (files.length === 0) return;

    const photoBucket = document.querySelector('.photobucket');
    photoBucket.style.display = 'flex';
    photoBucket.style.flexWrap = 'wrap';
    photoBucket.style.margin = '1px';

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(e) {
            const container = document.createElement('div');
            container.style.display = 'flex';
            container.style.flexDirection = 'column';
            container.style.alignItems = 'center';

            const image = document.createElement('img');
            image.src = e.target.result;
            image.style.maxWidth = '200px';
            image.style.maxHeight = 'auto';
            image.style.display = 'inline-block';
            image.style.margin = '5px';
            image.style.padding = '5px';

            const btn = document.createElement('button');
            btn.innerHTML = 'Remove Image';
            btn.addEventListener('click', function() {
                photoBucket.removeChild(container);
            });

            container.appendChild(image);
            container.appendChild(btn);

            photoBucket.appendChild(container);
        };

        reader.readAsDataURL(file);
    }
}

// Add event listener to the "Add Photo" link
document.addEventListener('click', function() {
    const addPhotoLink = document.querySelector('a[href="/photo album/addPhoto"]');
    addPhotoLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior

        // Create an input element of type file
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*'; // Accept only image files
        fileInput.style.display = 'none'; // Hide the file input

        const photoContainer = document.querySelector('.bucket');
        // Append the file input to the body
        photoContainer.appendChild(fileInput);

        // Trigger a click event on the file input
        fileInput.click();

        // Listen for changes in the file input
        fileInput.addEventListener('change', handleFileSelect);

        // Remove the file input from the DOM after the user selects a file
        fileInput.addEventListener('click', function() {
            document.body.removeChild(fileInput);
        });
    });
});