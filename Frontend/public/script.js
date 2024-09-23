document.getElementById('menu-toggle').addEventListener('click', function(event) {
    var menu = document.getElementById('dropdown-menu');
    // Toggle the menu visibility
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
    
    event.stopPropagation(); // Prevent the click event from bubbling up
});

// Close the dropdown-menu if clicking outside of it
window.addEventListener('click', function(event) {
    var menu = document.getElementById('dropdown-menu');
    if (menu.style.display === 'block' && !event.target.matches('#menu-toggle')) {
        menu.style.display = 'none';
    }
});
document.getElementById('username-toggle').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    var dropdown = document.querySelector('.username-dropdown');
    dropdown.classList.toggle('active');
});

// Close the dropdown if clicking outside of it
window.onclick = function(event) {
    if (!event.target.matches('#username-toggle')) {
        var dropdowns = document.getElementsByClassName("username-dropdown");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('active')) {
                openDropdown.classList.remove('active');
            }
        }
    }
};

function enableEdit(inputId) {
    const inputField = document.getElementById(inputId);
    const icon = inputField.nextElementSibling;

    if (inputField.hasAttribute('readonly')) {
        // If the field is in read-only mode, enable editing
        inputField.removeAttribute('readonly');
        inputField.focus();
        icon.classList.remove('fa-pencil-alt');
        icon.classList.add('fa-save'); // Change icon to save
    } else {
        // Save the input and disable editing
        inputField.setAttribute('readonly', true);
        icon.classList.remove('fa-save');
        icon.classList.add('fa-pencil-alt'); // Change icon back to edit
    }
}