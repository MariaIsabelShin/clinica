document.addEventListener('DOMContentLoaded', () => {
    cargarEspecialistas();
    cargarCitas();
    document.getElementById('form-cita').addEventListener('submit', guardarCita);
});

async function cargarEspecialistas() {
    try {
        const response = await fetch('especialistas.json');
        const data = await response.json();
        const contenedor = document.getElementById('especialistas-list');

        data.forEach((doc, index) => {
            const card = document.createElement('div');
            card.className = 'card-medico';
            card.innerHTML = `
                <img src="${doc.foto}">
                <div class="card-info">
                    <h4>${doc.nombre}</h4>
                    <p><b>${doc.especialidad}</b></p>
                    <p><small>${doc.horario}</small></p>
                    <p><small>📍 ${doc.consultorio}</small></p>
                </div>
            `;
            contenedor.appendChild(card);
            setTimeout(() => card.classList.add('visible'), index * 200);
        });
    } catch (e) {
        console.error("Error:", e);
    }
}

function guardarCita(e) {
    e.preventDefault();
    const cita = {
        nombre: document.getElementById('nombre').value,
        cedula: document.getElementById('cedula').value,
        especialidad: document.getElementById('especialidad-select').value,
        fecha: document.getElementById('fecha').value
    };
    let citas = JSON.parse(localStorage.getItem('citas')) || [];
    citas.push(cita);
    localStorage.setItem('citas', JSON.stringify(citas));
    alert("Cita guardada");
    e.target.reset();
    cargarCitas();
}

function cargarCitas() {
    const contenedor = document.getElementById('lista-citas');
    const citas = JSON.parse(localStorage.getItem('citas')) || [];
    contenedor.innerHTML = citas.length ? citas.map(c => `
        <div class="service-card" style="text-align:left; margin-bottom:10px; border-left:4px solid #007bff">
            <strong>${c.especialidad}</strong> - ${c.fecha}<br><small>${c.nombre}</small>
        </div>
    `).join('') : "<p>Sin citas.</p>";
}