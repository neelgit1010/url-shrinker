function deleteUrl(urlId) {
    fetch(`/url/delete/${urlId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log('Success:', data.message); // Log the success message
          const url = document.getElementById(`url-${urlId}`);
          if(url){
            url.remove();
          }
          alert('Url deleted successfully');
        });
      } else {
        response.json().then(data => {
          console.error('Error response:', data); // Log error details
          alert('Failed to delete blog: ' + data.message);
        }).catch(err => {
          console.error('Error parsing response:', err);
          alert('Failed to delete blog');
        });
      }
    })
    .catch(error => {
      console.error('Network error:', error); // Log network errors
      alert('Failed to delete blog');
    });
  }
  