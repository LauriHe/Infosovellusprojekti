const displaySettingsPage = () => {
  const container = document.querySelector('.container');
  container.innerHTML = '';

  const heading = document.createElement('h1');
  heading.classList.add('settings-heading');
  heading.innerHTML = 'Settings';

  const form = document.createElement('form');
  form.classList.add('settings-form');

  const campusLabel = document.createElement('label');
  campusLabel.classList.add('settings-label');

  const campusLabelText = document.createElement('span');
  campusLabelText.classList.add('settings-label-text');
  campusLabelText.innerHTML = 'Campus';

  const campusSelect = document.createElement('select');
  campusSelect.classList.add('settings-select');
  campusSelect.id = 'campus';

  const campusSelectOption1 = document.createElement('option');
  campusSelectOption1.value = 'arabia';
  campusSelectOption1.innerHTML = 'arabia';

  const campusSelectOption2 = document.createElement('option');
  campusSelectOption2.value = 'karamalmi';
  campusSelectOption2.innerHTML = 'karamalmi';

  const campusSelectOption3 = document.createElement('option');
  campusSelectOption3.value = 'myllypuro';
  campusSelectOption3.innerHTML = 'myllypuro';

  const campusSelectOption4 = document.createElement('option');
  campusSelectOption4.value = 'myyrmaki';
  campusSelectOption4.innerHTML = 'myyrmäki';

  campusSelect.appendChild(campusSelectOption1);
  campusSelect.appendChild(campusSelectOption2);
  campusSelect.appendChild(campusSelectOption3);
  campusSelect.appendChild(campusSelectOption4);

  campusLabel.appendChild(campusLabelText);
  campusLabel.appendChild(campusSelect);

  const langLabel = document.createElement('label');
  langLabel.classList.add('settings-label');

  const langLabelText = document.createElement('span');
  langLabelText.classList.add('settings-label-text');
  langLabelText.innerHTML = 'Language';

  const langSelect = document.createElement('select');
  langSelect.classList.add('settings-select');
  langSelect.id = 'lang';

  const langSelectOption1 = document.createElement('option');
  langSelectOption1.value = 'en';
  langSelectOption1.innerHTML = 'English';

  const langSelectOption2 = document.createElement('option');
  langSelectOption2.value = 'fi';
  langSelectOption2.innerHTML = 'Finnish';

  langSelect.appendChild(langSelectOption1);
  langSelect.appendChild(langSelectOption2);

  langLabel.appendChild(langLabelText);
  langLabel.appendChild(langSelect);

  const searchRadiusLabel = document.createElement('label');
  searchRadiusLabel.classList.add('settings-label');

  const searchRadiusLabelText = document.createElement('span');
  searchRadiusLabelText.classList.add('settings-label-text');
  searchRadiusLabelText.innerHTML = 'Search radius';

  const searchRadiusInput = document.createElement('input');
  searchRadiusInput.classList.add('settings-input');
  searchRadiusInput.id = 'searchRadius';
  searchRadiusInput.type = 'number';
  searchRadiusInput.min = '0';
  searchRadiusInput.max = '1000';
  searchRadiusInput.step = '50';

  searchRadiusLabel.appendChild(searchRadiusLabelText);
  searchRadiusLabel.appendChild(searchRadiusInput);

  const submitButton = document.createElement('button');
  submitButton.classList.add('settings-submit-button');
  submitButton.type = 'submit';
  submitButton.innerHTML = 'Save';

  form.appendChild(campusLabel);
  form.appendChild(langLabel);
  form.appendChild(searchRadiusLabel);
  form.appendChild(submitButton);

  container.appendChild(heading);
  container.appendChild(form);

  const settings = JSON.parse(localStorage.getItem('settings'));

  if (settings) {
    document.querySelector('#campus').value = settings.campus;
    document.querySelector('#lang').value = settings.lang;
    document.querySelector('#searchRadius').value = settings.searchRadius;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const campus = document.querySelector('#campus').value;
    const lang = document.querySelector('#lang').value;
    const searchRadius = document.querySelector('#searchRadius').value;

    localStorage.setItem(
      'settings',
      JSON.stringify({
        campus,
        lang,
        searchRadius,
      })
    );
  });
};

export default displaySettingsPage;
