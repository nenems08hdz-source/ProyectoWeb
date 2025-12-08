document.addEventListener('DOMContentLoaded', () => {
    
    const calendarGrid = document.querySelector('.calendar-grid');
    const monthBanner = document.getElementById('month-banner');
    const calendarYear = document.getElementById('calendar-year');
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');
    const activityCount = document.getElementById('activity-count');
    const activityList = document.getElementById('activity-list');
    const selectedDayText = document.getElementById('selected-day-text');

    const addActivityBtn = document.getElementById('add-activity-btn');
    const addActivityModal = document.getElementById('add-activity-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const cancelAddBtn = document.getElementById('cancel-add-btn');
    const addActivityForm = document.getElementById('add-activity-form');
    const activityDateInput = document.getElementById('activity-date');
    const noActivitiesMsg = document.getElementById('no-activities-msg');

    let viewDate = new Date();
    viewDate.setDate(1); 

    let selectedDate = new Date();

    const MONTH_NAMES = [
        "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
        "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
    ];

    let activities = {};

    const formatDate = (date) => {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    };
    
    const getSelectedDateId = () => formatDate(selectedDate);
    
    const initializeActivities = () => {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        activities[formatDate(today)] = [
            { id: Date.now(), name: "Entrega Final de Proyecto", description: "Revisar y enviar el borrador final del Anteproyecto.", completed: false, date: formatDate(today) },
            { id: Date.now() + 1, name: "Reunión con Asesor", description: "Preparar preguntas sobre el capítulo 2.", completed: false, date: formatDate(today) }
        ];

        activities[formatDate(tomorrow)] = [
            { id: Date.now() + 2, name: "Investigación sobre Caso de Estudio", description: "Buscar tres fuentes académicas relevantes.", completed: true, date: formatDate(tomorrow) }
        ];
    };

    const renderCalendar = () => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        
        // Actualizar encabezados
        monthBanner.textContent = MONTH_NAMES[month];
        calendarYear.textContent = year;
        
        while (calendarGrid.children.length > 7) {
            calendarGrid.removeChild(calendarGrid.lastChild);
        }

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfWeek = viewDate.getDay();

        for (let i = 0; i < firstDayOfWeek; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'day-cell empty-cell';
            calendarGrid.appendChild(emptyCell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'day-cell';
            dayCell.textContent = day;
            dayCell.dataset.day = day;
            dayCell.dataset.month = month;
            dayCell.dataset.year = year;

            const currentDateStr = formatDate(new Date(year, month, day));

            if (activities[currentDateStr] && activities[currentDateStr].length > 0) {
                const icon = document.createElement('i');
                icon.className = 'fas fa-calendar-check activity-icon';
                dayCell.appendChild(icon);
            }

            if (day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
                dayCell.classList.add('selected');
            }

            dayCell.addEventListener('click', handleDayClick);

            calendarGrid.appendChild(dayCell);
        }
    };

    const renderActivityList = () => {
        const dateId = getSelectedDateId();
        const activitiesForDay = activities[dateId] || [];
        
        activityList.innerHTML = ''; 
        
        if (activitiesForDay.length === 0) {
            noActivitiesMsg.style.display = 'block';
            activityCount.textContent = 0;
            return;
        }

        noActivitiesMsg.style.display = 'none';
        
        let pendingCount = 0;

        activitiesForDay.forEach(activity => {
            if (!activity.completed) {
                pendingCount++;
            }
            activityList.appendChild(createActivityCard(activity));
        });

        activityCount.textContent = pendingCount;
    };

    const createActivityCard = (activity) => {
        const card = document.createElement('div');
        card.className = `activity-card ${activity.completed ? 'completed' : ''}`;
        card.dataset.id = activity.id;

        const details = document.createElement('div');
        details.className = 'activity-card-details';
        details.innerHTML = `
            <h4>${activity.name}</h4>
            <p>${activity.description || 'Sin descripción.'}</p>
        `;

        const completeBtn = document.createElement('button');
        completeBtn.className = 'complete-btn';
        completeBtn.textContent = activity.completed ? 'Deshacer' : 'Completar';
        completeBtn.addEventListener('click', () => toggleActivityCompletion(activity.id));

        card.appendChild(details);
        card.appendChild(completeBtn);
        return card;
    };

    const handleDayClick = (e) => {
        const cell = e.currentTarget;
        if (cell.classList.contains('empty-cell')) return;

        const previousSelected = document.querySelector('.day-cell.selected');
        if (previousSelected) {
            previousSelected.classList.remove('selected');
        }

        cell.classList.add('selected');
        const day = parseInt(cell.dataset.day);
        const month = parseInt(cell.dataset.month);
        const year = parseInt(cell.dataset.year);
        
        selectedDate = new Date(year, month, day);

        if (formatDate(selectedDate) === formatDate(new Date())) {
             selectedDayText.textContent = 'Hoy';
        } else {
             selectedDayText.textContent = `${day} de ${MONTH_NAMES[month]}`;
        }

        renderActivityList();
    };
    
    const changeMonth = (delta) => {
        const newMonth = viewDate.getMonth() + delta;
        viewDate.setMonth(newMonth);
        viewDate.setDate(1); 

        if (selectedDate.getMonth() !== viewDate.getMonth() || selectedDate.getFullYear() !== viewDate.getFullYear()) {
             selectedDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
        }
        
        renderCalendar();
        renderActivityList();
    };

    const addActivity = (e) => {
        e.preventDefault();

        const name = document.getElementById('activity-name').value;
        const dateStr = document.getElementById('activity-date').value;
        const description = document.getElementById('activity-description').value;

        const dateKey = dateStr;
        const newActivity = {
            id: Date.now(),
            name: name,
            description: description,
            completed: false,
            date: dateKey
        };

        if (!activities[dateKey]) {
            activities[dateKey] = [];
        }
        activities[dateKey].push(newActivity);

        if (dateKey === getSelectedDateId()) {
            renderActivityList();
        }

        const [year, month, day] = dateKey.split('-').map(Number);
        if (month - 1 === viewDate.getMonth() && year === viewDate.getFullYear()) {
            renderCalendar();
        }

        closeModal();
        addActivityForm.reset();
    };

    const toggleActivityCompletion = (id) => {
        const dateId = getSelectedDateId();
        const activityIndex = activities[dateId].findIndex(a => a.id === id);

        if (activityIndex > -1) {
            activities[dateId][activityIndex].completed = !activities[dateId][activityIndex].completed;
            renderActivityList(); 
        }
    };

    const openModal = () => {
        activityDateInput.value = getSelectedDateId();
        addActivityModal.style.display = 'flex';
        setTimeout(() => addActivityModal.classList.add('open'), 10); 
    };

    const closeModal = () => {
        addActivityModal.classList.remove('open');
        setTimeout(() => addActivityModal.style.display = 'none', 300);
    };

    prevMonthBtn.addEventListener('click', () => changeMonth(-1));
    nextMonthBtn.addEventListener('click', () => changeMonth(1));

    addActivityBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    cancelAddBtn.addEventListener('click', closeModal);
    addActivityForm.addEventListener('submit', addActivity);
    

    addActivityModal.addEventListener('click', (e) => {
        if (e.target === addActivityModal) {
            closeModal();
        }
    });
 
    initializeActivities();   
    renderCalendar();
    const currentDayCell = document.querySelector(`.day-cell[data-day="${selectedDate.getDate()}"]`);
    if (currentDayCell) {
        currentDayCell.classList.add('selected');
    }
    renderActivityList();


    if (formatDate(selectedDate) === formatDate(new Date())) {
         selectedDayText.textContent = 'Hoy';
    } else {
         selectedDayText.textContent = `${selectedDate.getDate()} de ${MONTH_NAMES[selectedDate.getMonth()]}`;
    }
});