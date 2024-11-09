window.onscroll = function() {
    var textHolder = document.querySelector('.text-holder');
    
    // Check if the textHolder element exists
    if (!textHolder) {
      console.error('No element found with the class "text-holder".');
      return;
    }

    var scrollPosition = window.scrollY;

    // Calculate the zoom factor based on the scroll position
    var zoomFactor = 1 + (scrollPosition / 50); // Adjust the divisor for different zoom speeds

    // Set the maximum zoom limit
    if (zoomFactor > 2) zoomFactor = 2;

    // Only apply the zoom on larger screens
    if (window.innerWidth > 768) {
      textHolder.style.transform = 'scale(' + zoomFactor + ')';
    }
  };
  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  window.onload = function() {
    scrollToTop();
  };


  // read more btn
  document.querySelectorAll('.readMoreBtn').forEach(button => {
    button.addEventListener('click', function() {
      const text = this.parentElement.previousElementSibling;
      const dots = text.querySelector('.dots');
      const moreText = text.querySelector('.more');

      if (dots.style.display === "none") {
        dots.style.display = "inline";
        moreText.style.display = "none";
        this.innerHTML = "Read More";
      } else {
        dots.style.display = "none";
        moreText.style.display = "inline";
        this.innerHTML = "Read Less";
      }
    });
  });

    // form submission

    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent the default form submission behavior
      
      const formData = new FormData(this);
    
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json' // Ensure you accept JSON response
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          // Hide the form and show the thank you message
          document.getElementById('contactForm').style.display = 'none';
          document.getElementById('thankYouMessage').style.display = 'block';
        } else {
          console.error('Error:', data.message);
          alert("There was an error sending your message: " + data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert("There was an error sending your message. Please try again.");
      });
    });
    