var makeDate = function () {
    var d = new Date();
    var formattedDate = "";

    formattedDate += (d.getMonth() + 1) + "_";
    formattedDate += (d.getDate() + 1) + "_";
    formattedDate += (d.getFullYear() + 1) + "_";
    return formattedDate;

};

module.exports = makeDate;