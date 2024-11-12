function toggleMenu(){
    document.getElementById("menu").classList.toggle("show");
}
document.querySelectorAll('.project_links a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        const img = link.querySelector('img');
        // Store the original src in a data attribute
        img.dataset.originalSrc = img.src;
        // Change the src to the new image
        img.src = "https://img.icons8.com/?size=100&id=62856&format=png&color=508C9B";
    });

    link.addEventListener('mouseleave', function() {
        const img = link.querySelector('img');
        // Restore the original src from the data attribute
        img.src = img.dataset.originalSrc;
    });
});
