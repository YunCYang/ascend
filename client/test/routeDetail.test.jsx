import { gradeConversion } from '../components/routeDetail';

describe('routeDetail grade conversion test', () => {
  it('should return null', () => {
    const nullInput = gradeConversion();
    expect(nullInput).toBe(null);
  });

  it('excessive appendage V', () => {
    const excessiveAppendage = gradeConversion('V1a');
    expect(excessiveAppendage).toBe('wrong format');
  });

  it('excessive appendage Font', () => {
    const excessiveAppendage = gradeConversion('1c+a');
    expect(excessiveAppendage).toBe('wrong format');
  });

  it('wrong appendage Font', () => {
    const wrongAppendage = gradeConversion('1c-');
    expect(wrongAppendage).toBe('wrong format');
  });

  it('excessive prependage V', () => {
    const excessivePrependage = gradeConversion('VV1');
    expect(excessivePrependage).toBe('wrong format');
  });

  it('excessive prependage Font', () => {
    const excessivePrependage = gradeConversion('a1c+');
    expect(excessivePrependage).toBe('wrong format');
  });

  it('wrong appendage V', () => {
    const wrongAppendage = gradeConversion('Va');
    expect(wrongAppendage).toBe('wrong format');
  });

  it('wrong appendage Font', () => {
    const wrongAppendage = gradeConversion('1c+1');
    expect(wrongAppendage).toBe('wrong format');
  });

  it('wrong prependage', () => {
    const wrongPrependage = gradeConversion('A1');
    expect(wrongPrependage).toBe('wrong format');
  });

  it('wrong format Font', () => {
    const wrongFormat = gradeConversion('1a1+');
    expect(wrongFormat).toBe('wrong format');
  });

  it('number only string Font', () => {
    const numberFont = gradeConversion('6');
    expect(numberFont).toBe('V3 | 6A/6A+');
  });

  it('number only int Font', () => {
    const numberFont = gradeConversion(6);
    expect(numberFont).toBe('V3 | 6A/6A+');
  });

  it('lowercase Font', () => {
    const lowercaseFont = gradeConversion('6a');
    expect(lowercaseFont).toBe('V3 | 6A/6A+');
  });

  it('uppercase Font', () => {
    const uppercaseFont = gradeConversion('6A');
    expect(uppercaseFont).toBe('V3 | 6A/6A+');
  });

  it('with plus sign Font', () => {
    const withPlusSignFont = gradeConversion('6A+');
    expect(withPlusSignFont).toBe('V3 | 6A/6A+');
  });

  it('lowercase V', () => {
    const lowercaseV = gradeConversion('v3');
    expect(lowercaseV).toBe('V3 | 6A/6A+');
  });

  it('uppercase V', () => {
    const uppercaseV = gradeConversion('V3');
    expect(uppercaseV).toBe('V3 | 6A/6A+');
  });
});
