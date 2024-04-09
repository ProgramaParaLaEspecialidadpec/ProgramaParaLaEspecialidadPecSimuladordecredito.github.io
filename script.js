document.getElementById('calculateButton').addEventListener('click', function() {
    var loanAmount = parseInt(document.getElementById('loanAmount').value);
    var loanTerm = parseInt(document.getElementById('loanTerm').value);
    var interestRate = parseFloat(document.getElementById('interestRate').value);

    var monthlyInterestRate = interestRate / 100;
    var monthlyPayment = Math.round((loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -loanTerm)));
    var totalPayment = monthlyPayment * loanTerm;
    var totalInterest = totalPayment - loanAmount;

    var results = document.getElementById('results');
    results.innerHTML = `
        <h2>Resultados</h2>
        <p>Valor de la Cuota Mensual: $${monthlyPayment.toLocaleString('es-CO')}</p>
        <p>Valor Total a Pagar con Intereses: $${totalPayment.toLocaleString('es-CO')}</p>
        <p>Valor Total de Intereses a Pagar: $${totalInterest.toLocaleString('es-CO')}</p>
    `;

    displayAmortizationTable(loanAmount, loanTerm, interestRate, monthlyPayment);
});

function displayAmortizationTable(loanAmount, loanTerm, interestRate, monthlyPayment) {
    var tableBody = document.getElementById('amortizationBody');
    tableBody.innerHTML = '';

    var remainingBalance = loanAmount;
    for (var i = 1; i <= loanTerm; i++) {
        var interestPayment = Math.round(remainingBalance * (interestRate / 100));
        var capitalPayment = monthlyPayment - interestPayment;
        remainingBalance -= capitalPayment;

        var row = `<tr>
            <td>${i}</td>
            <td>${capitalPayment.toLocaleString('es-CO')}</td>
            <td>${interestPayment.toLocaleString('es-CO')}</td>
            <td>${remainingBalance.toLocaleString('es-CO')}</td>
        </tr>`;
        tableBody.innerHTML += row;
    }

    document.getElementById('amortizationTable').style.display = 'block';
}
