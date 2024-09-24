function getLoanInput() {
  let loanObj = {};

  const loanTerm = parseInt(document.getElementById("loanTerm").value);

  const loanAmount = parseInt(document.getElementById("loanAmount").value);

  const interestRate = parseFloat(
    document.getElementById("interestRate").value
  );

  loanObj["term"] = loanTerm;

  loanObj["amount"] = loanAmount;

  loanObj["interest"] = interestRate;

  getPaymentAmount(loanObj);
}

function getPaymentAmount(obj) {
  const loanAmount = obj.amount;

  const interestRate = obj.interest / 100 / 12;

  const totalMonths = obj.term * 12;

  const monthlyPayment =
    (loanAmount * interestRate) /
    (1 - Math.pow(1 + interestRate, -totalMonths));

  document.getElementById("monthlyPayment").innerHTML =
    monthlyPayment.toLocaleString(undefined, {
      minimumFractionDigits: 2,

      maximumFractionDigits: 2,

      style: "currency",

      currency: "USD",
    });

  let loanData = {
    monthlyPayment: monthlyPayment,

    interestRate: interestRate,

    term: totalMonths,

    loanBalance: loanAmount,
  };

  buildPaymentSchedule(loanData);
}

function buildPaymentSchedule(obj) {
  let paymentArray = [];

  let loanTerm = obj.term;

  let payment = obj.monthlyPayment;

  let rate = obj.interestRate;

  let totalLoan = obj.loanBalance;

  let totalInterest = 0;

  let totalPrincipal = 0;

  let loanBalance = totalLoan;

  let principalPayment = 0;

  let monthlyInterest = 0;

  let month = 0;

  for (let i = 0; i < loanTerm; i++) {
    month++;

    monthlyInterest = rate * loanBalance;

    principalPayment = payment - monthlyInterest;

    loanBalance -= principalPayment;

    totalInterest += monthlyInterest;

    totalPrincipal += principalPayment;

    paymentArray.push({
      month,
      monthlyInterest,
      principalPayment,
      loanBalance,
      totalInterest,
      totalPrincipal,
      totalLoan,
      rate,
      payment,
    });
  }

  displayLoanTotals(paymentArray);

  displayLoanBreakdown(paymentArray);
}

function displayLoanTotals(arr) {
  let totalPrincipal = arr[arr.length - 1].totalPrincipal;

  let totalInterest = arr[arr.length - 1].totalInterest;

  let totalCost =
    arr[arr.length - 1].totalPrincipal + arr[arr.length - 1].totalInterest;

  document.getElementById("totalPrincipal").innerHTML =
    totalPrincipal.toLocaleString(undefined, {
      minimumFractionDigits: 2,

      maximumFractionDigits: 2,

      style: "currency",

      currency: "USD",
    });

  document.getElementById("totalInterest").innerHTML =
    totalInterest.toLocaleString(undefined, {
      minimumFractionDigits: 2,

      maximumFractionDigits: 2,

      style: "currency",

      currency: "USD",
    });

  document.getElementById("totalCost").innerHTML = totalCost.toLocaleString(
    undefined,
    {
      minimumFractionDigits: 2,

      maximumFractionDigits: 2,

      style: "currency",

      currency: "USD",
    }
  );
}

function displayLoanBreakdown(arr) {
  const loanSchedule = document.getElementById("loanScheduleBreakdown");

  const template = document.getElementById("loan-data-template");

  const loanTable = document.getElementById("loanBreakdownTable");

  if (loanTable.classList.contains("d-none")) {
    loanTable.classList.remove("d-none");
  }

  loanSchedule.innerHTML = "";

  for (let i = 0; i < arr.length; i++) {
    const dataRow = document.importNode(template.content, true);

    dataRow.getElementById("month").textContent = arr[i].month;

    dataRow.getElementById("payment").textContent = arr[
      i
    ].payment.toLocaleString(undefined, {
      minimumFractionDigits: 2,

      maximumFractionDigits: 2,

      style: "currency",

      currency: "USD",
    });

    dataRow.getElementById("principal").textContent = arr[
      i
    ].principalPayment.toLocaleString(undefined, {
      minimumFractionDigits: 2,

      maximumFractionDigits: 2,

      style: "currency",

      currency: "USD",
    });

    dataRow.getElementById("interest").textContent = arr[
      i
    ].monthlyInterest.toLocaleString(undefined, {
      minimumFractionDigits: 2,

      maximumFractionDigits: 2,

      style: "currency",

      currency: "USD",
    });

    dataRow.getElementById("total_interest").textContent = arr[
      i
    ].totalInterest.toLocaleString(undefined, {
      minimumFractionDigits: 2,

      maximumFractionDigits: 2,

      style: "currency",

      currency: "USD",
    });

    dataRow.getElementById("balance").textContent = Math.abs(
      arr[i].loanBalance
    ).toLocaleString(undefined, {
      minimumFractionDigits: 2,

      maximumFractionDigits: 2,

      style: "currency",

      currency: "USD",
    });

    loanSchedule.appendChild(dataRow);
  }
}
