const gallery = document.querySelector('.gallery');

fetch('https://jsonplaceholder.typicode.com/photos')
  .then(response => response.json())
  .then(photos => {
    photos.slice(0, 10).forEach(photo => {
      const photoElement = document.createElement('div');
      photoElement.classList.add('photo');
      photoElement.innerHTML = `
        <img src="${photo.url}" alt="${photo.title}">
        <p>${photo.title}</p>
      `;
      gallery.appendChild(photoElement);
    });
  })
  .catch(error => {
    console.error('Error fetching photos:', error);
  });
