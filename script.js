function toggleMenu(){
    document.getElementById("menu").classList.toggle("show");
}
document.querySelectorAll('.project_links a').forEach(link => {
    link.addEventListener('mouseenter', function(){
        const img = link.querySelector('img');
        img.dataset.originalSrc = img.src;
        img.src = "https://img.icons8.com/?size=100&id=62856&format=png&color=A64D79";
    });

    link.addEventListener('mouseleave', function(){
        const img = link.querySelector('img');
        img.src = img.dataset.originalSrc;
    });
});
