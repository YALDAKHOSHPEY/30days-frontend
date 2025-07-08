const form = document.getElementById('item-form');
const input = document.getElementById('item-input');
const list = document.getElementById('item-list');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const value = input.value.trim();
  if (!value) return;

  const li = document.createElement('li');
  li.classList.add('item');

  const span = document.createElement('span');
  span.textContent = value;
  span.addEventListener('click', () => {
    li.classList.toggle('done');
  });

  const btns = document.createElement('div');
  btns.className = 'btns';

  const delBtn = document.createElement('button');
  delBtn.innerHTML = '🗑️';
  delBtn.title = 'Delete';
  delBtn.addEventListener('click', () => {
    li.remove();
  });

  btns.appendChild(delBtn);
  li.appendChild(span);
  li.appendChild(btns);
  list.appendChild(li);

  input.value = '';
});
