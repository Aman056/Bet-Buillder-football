// Sub market Calculator---->
const SubmarketCalculator = ({ decimalOdds, fractionalOdds }) => {
    const [numerator, denominator] = fractionalOdds && fractionalOdds.includes('/') ? fractionalOdds.split('/') : [null, null];
    const submarket = numerator && denominator ? (1 / (1 / decimalOdds + 1 / ((parseInt(numerator) / parseInt(denominator)) + 1))).toFixed(2) : '';
    return submarket
};
export default SubmarketCalculator;
