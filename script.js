const sanitize = (str) => str.replace(/[<>]/g, '');

function updatePreview() {
  const preview = document.getElementById('livePreviewContent');
  preview.innerHTML = '';
  const dropContainer = document.getElementById('dropContainer');
  const children = dropContainer.querySelectorAll('.input-field');
  children.forEach(child => {
    const input = child.querySelector('input, textarea');
    if (input && input.type !== 'file') {
      const label = child.querySelector('label')?.textContent;
      const value = sanitize(input.value);
      const div = document.createElement('div');
      div.innerHTML = `<strong>${label}:</strong> ${value}`;
      preview.appendChild(div);
    }
  });
}

function loadImage(event) {
  const image = document.createElement('img');
  image.src = URL.createObjectURL(event.target.files[0]);
  image.className = 'preview-image';
  const preview = document.getElementById('livePreviewContent');
  preview.appendChild(image);
}

function loadBackground(event) {
  const preview = document.getElementById('previewBg');
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    preview.style.backgroundImage = `url(${e.target.result})`;
  }
  reader.readAsDataURL(file);
}

function removeField(button) {
  button.parentElement.remove();
  updatePreview();
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("component", ev.target.dataset.component);
}

function drop(ev) {
  ev.preventDefault();
  const component = ev.dataTransfer.getData("component");
  if (component) {
    const htmlMap = {
      name: `<div class="input-field" draggable="true"><button class="delete-btn" onclick="removeField(this)">x</button><label>Name</label><input type="text" placeholder="Your name" oninput="updatePreview()"></div>`,
      bio: `<div class="input-field" draggable="true"><button class="delete-btn" onclick="removeField(this)">x</button><label>Bio</label><textarea rows="3" placeholder="A short bio" oninput="updatePreview()"></textarea></div>`,
      skills: `<div class="input-field" draggable="true"><button class="delete-btn" onclick="removeField(this)">x</button><label>Skills</label><input type="text" placeholder="HTML, CSS, JavaScript" oninput="updatePreview()"></div>`,
      project: `<div class="input-field" draggable="true"><button class="delete-btn" onclick="removeField(this)">x</button><label>Project</label><input type="text" placeholder="Project name" oninput="updatePreview()"></div>`,
      description: `<div class="input-field" draggable="true"><button class="delete-btn" onclick="removeField(this)">x</button><label>Description</label><textarea rows="3" placeholder="Project description" oninput="updatePreview()"></textarea></div>`,
      profilePicture: `<div class="input-field" draggable="true"><button class="delete-btn" onclick="removeField(this)">x</button><label>Profile Picture</label><input type="file" accept="image/*" onchange="loadImage(event)"></div>`,
      bgImage: `<div class="input-field" draggable="true"><button class="delete-btn" onclick="removeField(this)">x</button><label>Background Image</label><input type="file" accept="image/*" onchange="loadBackground(event)"></div>`
    };

    const dropContainer = document.getElementById("dropContainer");
    const wrapper = document.createElement("div");
    wrapper.innerHTML = htmlMap[component];
    dropContainer.appendChild(wrapper);
    updatePreview();
  }
}

document.addEventListener('DOMContentLoaded', updatePreview);