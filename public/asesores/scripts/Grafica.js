function initializeChart() {
    // 1. Utility function to get custom CSS variables
    const getCssVar = (name) => {
        // We get the value of the CSS variable defined in PantallaInicio.css
        // Usamos trim() para remover cualquier espacio en blanco
        return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    }
    
    // Get colors from CSS to maintain coherence
    const approvedColor = getCssVar('--color-approved');
    const revisionColor = getCssVar('--color-revision');
    const darkTextColor = getCssVar('--color-text-dark');
    // Define a secondary color for the text inside the chart
    const secondaryTextColor = '#6b7280'; // Gray-500 equivalent 

    // 2. Get the canvas element by its ID
    const ctx = document.getElementById('anteproyectoDonaChart');
    if (!ctx) {
        console.error("No se encontró el elemento canvas con ID 'anteproyectoDonaChart'.");
        return;
    }
    
    // 3. Chart data (Example: 80% Approved, 20% Under review)
    const data = {
        labels: ['Aprobados', 'En revisión'],
        datasets: [{
            data: [80, 20], // Percentages
            backgroundColor: [
                approvedColor, // Approved Color
                revisionColor  // Under Review Color
            ],
            hoverOffset: 4,
            borderWidth: 0 
        }]
    };

    // 4. Custom plugin to display the percentage in the center of the doughnut
    const centerTextPlugin = {
        id: 'centerText',
        beforeDraw: (chart) => {
            const { ctx, chartArea: { top, bottom, left, right } } = chart;
            ctx.save();
            
            // Get the approved percentage value
            const approvedValue = chart.data.datasets[0].data[0];
            const approvedPercentage = `${approvedValue}%`;

            // Style and draw the percentage (80%)
            ctx.font = 'bolder 24px Inter, sans-serif';
            ctx.fillStyle = darkTextColor; 
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            const centerX = (left + right) / 2;
            const centerY = (top + bottom) / 2;
            
            ctx.fillText(approvedPercentage, centerX, centerY - 10);
            
            // Style and draw the label 'Aprobados'
            ctx.font = '12px Inter, sans-serif';
            ctx.fillStyle = secondaryTextColor;
            ctx.fillText('Aprobados', centerX, centerY + 15);

            ctx.restore();
        }
    };

    // 5. Creation of the Chart.js instance
    new Chart(ctx, { 
        type: 'doughnut',
        data: data,
        plugins: [centerTextPlugin], // Add the center text plugin
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '80%', // Doughnut thickness
            plugins: { 
                legend: { display: false }, // Hide Chart.js default legend (we use one in HTML)
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) { label += ': '; }
                            if (context.parsed !== null) { label += context.parsed + '%'; }
                            return label;
                        }
                    }
                }
            },
            elements: { arc: { borderWidth: 0 } }
        }
    });
}

// Initialize the chart once the DOM has fully loaded
document.addEventListener('DOMContentLoaded', initializeChart);