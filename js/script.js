// Scroll to section helper
    function scrollToSection(id){
      const el = document.getElementById(id);
      if(el) el.scrollIntoView({behavior:'smooth'});
    }

    // Join modal open/close
    function openJoin(){
      document.getElementById('joinModal').style.display = 'flex';
    }
    function closeJoin(){
      document.getElementById('joinModal').style.display = 'none';
    }
    function submitJoin(){
      const name = document.getElementById('joinName').value.trim();
      const email = document.getElementById('joinEmail').value.trim();
      if(!name || !email){
        alert('Please enter your name and email to join.');
        return;
      }
      alert(`Thank you, ${name}! You have successfully joined our community.`);
      // Here you could add actual form submission code
      closeJoin();
      document.getElementById('joinName').value = '';
      document.getElementById('joinEmail').value = '';
    }

    // FAQ accordion toggle
    document.querySelectorAll('.acc-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const open = item.classList.contains('acc-open');
        document.querySelectorAll('.acc-item').forEach(i => i.classList.remove('acc-open'));
        if(!open) item.classList.add('acc-open');
      });
    });

    // Problems & Solutions Data
    const psData = [
      {
        type: 'problem',
        icon: '⚠️',
        title: 'Poor Water Quality',
        desc: `Algae blooms, low oxygen levels, and harmful ammonia can kill fish quickly.`,
        quickLinks: [
          {text: 'Water Testing Guide', url: '#'},
          {text: 'Aeration Techniques', url: '#'}
        ],
        solution: {
          icon: '💧',
          title: 'Improve Aeration & Testing',
          desc: `Install low-cost aerators and use test strips weekly to monitor water quality. Add water plants to absorb nitrates.`,
          quickLinks: [
            {text: 'DIY Aerator Plans', url: '#'},
            {text: 'Water Quality Management', url: '#'}
          ]
        }
      },
      {
        type: 'problem',
        icon: '🐟',
        title: 'Diseases & Parasites',
        desc: `Fish can get bacterial infections and parasites reducing survival rates.`,
        quickLinks: [
          {text: 'Common Diseases', url: '#'},
          {text: 'Treatment Options', url: '#'}
        ],
        solution: {
          icon: '🩺',
          title: 'Regular Health Checks',
          desc: `Quarantine new stock, maintain pond hygiene, and apply herbal treatments recommended by experts.`,
          quickLinks: [
            {text: 'Herbal Remedies', url: '#'},
            {text: 'Pond Sanitation Tips', url: '#'}
          ]
        }
      },
      {
        type: 'problem',
        icon: '🍽️',
        title: 'Feed Costs Too High',
        desc: `High-quality feed can be expensive and hard to source in remote areas.`,
        quickLinks: [
          {text: 'Feed Cost Reduction', url: '#'},
          {text: 'Local Feed Mixes', url: '#'}
        ],
        solution: {
          icon: '🥗',
          title: 'Use Local Feed Ingredients',
          desc: `Mix local grains, legumes and agricultural by-products to create nutritious, affordable feed.`,
          quickLinks: [
            {text: 'Feed Formulation Guide', url: '#'},
            {text: 'Affordable Feed Sources', url: '#'}
          ]
        }
      }
    ];

    // Render Problems & Solutions cards
    function renderPsCards(){
      const container = document.getElementById('psGrid');
      container.innerHTML = '';

      psData.forEach((item, idx) => {
        // Problem Card
        const probCard = document.createElement('div');
        probCard.className = 'ps-card problem';
        probCard.innerHTML = `
          <div class="ps-icon">${item.icon}</div>
          <div>
            <h3 class="ps-title">${item.title}</h3>
            <div class="ps-desc">${item.desc}</div>
            <div class="quick-links">${item.quickLinks.map(link => `<a href="${link.url}" target="_blank">${link.text}</a>`).join('')}</div>
          </div>
        `;

        // Solution Card
        const solCard = document.createElement('div');
        solCard.className = 'ps-card solution';
        solCard.innerHTML = `
          <div class="ps-icon">${item.solution.icon}</div>
          <div>
            <h3 class="ps-title">${item.solution.title}</h3>
            <div class="ps-desc">${item.solution.desc}</div>
            <div class="quick-links">${item.solution.quickLinks.map(link => `<a href="${link.url}" target="_blank">${link.text}</a>`).join('')}</div>
          </div>
        `;

        // Toggle solution visibility on problem click
        probCard.addEventListener('click', () => {
          // If solution is visible, hide it
          if(solCard.style.display === 'flex') {
            solCard.style.display = 'none';
          } else {
            solCard.style.display = 'flex';
          }
        });

        // Initially hide solution
        solCard.style.display = 'none';
        solCard.style.flexDirection = 'row';

        container.appendChild(probCard);
        container.appendChild(solCard);
      });
    }

    // Search button scrolls to problems
    document.getElementById('searchBtn').addEventListener('click', () => {
      const query = document.getElementById('searchInput').value.trim().toLowerCase();
      if(query){
        alert(`Searching for: "${query}"\n\n(Search functionality not yet implemented)`);
      }
      scrollToSection('problems');
    });

    // Subscribe newsletter (basic)
    function subscribe(){
      const email = document.getElementById('newsEmail').value.trim();
      if(!email){
        alert('Please enter your email address to subscribe.');
        return;
      }
      alert(`Thank you for subscribing with ${email}!`);
      document.getElementById('newsEmail').value = '';
    }

    // On load
    renderPsCards();