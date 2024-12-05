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

function sendEmail() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    Email.send({
      SecureToken: "your-secure-token",
      To: "cyt.navin6@gmail.com",
      From: email,
      Subject: "New Contact Form Submission",
      Body: `Name: ${name} <br> Email: ${email} <br> Message: ${message}`,
    }).then((response) => {
      if (response === "OK") {
        alert("Your message has been sent successfully!");
      } else {
        alert("There was an error sending your message. Please try again.");
      }
    });
  }
  
