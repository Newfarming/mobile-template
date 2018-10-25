import {
  i18n
} from '@/setup/setup-i18n'

// 男装(in)
const MEN_CLOTHING_SIZE_CHART_IN = [
  [i18n.t('size.size'), i18n.t('size.bust') + '(in)', i18n.t('size.shoulder') + '(in)'],
  ['XXXS', '32.3-33.5', '15.7-16.1'],
  ['XXS', '33.5-34.6', '16.1-16.5'],
  ['XS', '34.6-35.8', '16.5-16.9'],
  ['S', '35.8-37', '16.9-17.3'],
  ['M', '37-38.6', '17.3-17.7'],
  ['L', '38.6-40.2', '17.7-18.1'],
  ['XL', '40.2-42.1', '18.1-18.5'],
  ['XXL', '42.1-44.1', '18.5-18.9'],
  ['XXXL', '44.1-46.1', '18.9-19.3'],
  ['4XL', '46.1-48.4', '19.3-19.7'],
  ['5XL', '48.4-50.8', '19.7-20.3'],
  ['6XL', '50.8-53.1', '20.3-20.9'],
  ['7XL', '53.1-55.5', '20.9-21.5']
]

// 男装(cm)
const MEN_CLOTHING_SIZE_CHART_CM = [
  [i18n.t('size.size'), i18n.t('size.bust') + '(cm)', i18n.t('size.shoulder') + '(cm)'],
  ['XXXS', '82-85', '39.9-40.9'],
  ['XXS', '85-88', '40.9-41.9'],
  ['XS', '88-91', '41.9-42.9'],
  ['S', '91-94', '42.9-43.9'],
  ['M', '94-98', '43.9-45.0'],
  ['L', '98-102', '45.0-46.0'],
  ['XL', '102-107', '46.0-47.0'],
  ['XXL', '107-112', '47.0-48.0'],
  ['XXXL', '112-117', '48.0-49.0'],
  ['4XL', '117-123', '49.0-50.0'],
  ['5XL', '123-129', '50.0-51.5'],
  ['6XL', '129-135', '51.5-53'],
  ['7XL', '135-141', '53-54.5']
]

// 男裤(in)
const MEN_PANTS_SIZE_CHART_IN = [
  [i18n.t('size.size'), i18n.t('size.waist') + '(in)', i18n.t('size.hip') + '(in)'],
  ['XXXS(28)', '27.6-28.7', '36.7-38.2'],
  ['XXS(29)', '28.7-30.3', '38.2-39.4'],
  ['XS(30)', '30.3-31.5', '39.4-40.6'],
  ['S(31)', '31.5-32.7', '40.6-42.1'],
  ['M(32)', '32.7-34.3', '42.1-43.3'],
  ['L(33)', '34.3-35.4', '43.3-44.5'],
  ['XL(34)', '35.4-36.6', '44.5-46.1'],
  ['XXL(36)', '36.6-38.2', '46.1-48.4'],
  ['XXXL(38)', '38.2-40.0', '48.4-50.0'],
  ['4XL(40)', '40.0-42.0', '50.0-51.2'],
  ['5XL(42)', '42.0-44.0', '51.2-53.5'],
  ['6XL(44)', '44.0-46.0', '53.5-55.5']
]

// 男裤(cm)
const MEN_PANTS_SIZE_CHART_CM = [
  [i18n.t('size.size'), i18n.t('size.waist') + '(cm)', i18n.t('size.hip') + '(cm)'],
  ['XXXS(28)', '70-73', '93-97'],
  ['XXS(29)', '73-77', '97-100'],
  ['XS(30)', '77-80', '100-103'],
  ['S(31)', '80-83', '103-107'],
  ['M(32)', '83-87', '107-110'],
  ['L(33)', '87-90', '110-113'],
  ['XL(34)', '90-93', '113-117'],
  ['XXL(36)', '93-97', '117-123'],
  ['XXXL(38)', '97-102', '123-127'],
  ['4XL(40)', '102-107', '127-131'],
  ['5XL(42)', '107-112', '131-136'],
  ['6XL(44)', '112-117', '136-141']
]

// 女上装(in)
const WOMEN_TOPS_SIZE_CHART_IN = [
  [i18n.t('size.size'), i18n.t('size.bust') + '(in)', i18n.t('size.shoulder') + '(in)'],
  ['XXXS', '32.3-33.5', '13.0-13.4'],
  ['XXS', '33.5-34.6', '13.4-13.8'],
  ['XS', '34.6-35.8', '13.8-14.2'],
  ['S', '35.8-37.0', '14.2-15.0'],
  ['M', '37.0-39.0', '15.0-15.7'],
  ['L', '39.0-40.6', '15.7-16.5'],
  ['XL', '40.6-42.1', '16.5-17.3'],
  ['XXL', '42.1-44.1', '17.3-18.1'],
  ['XXXL', '44.1-46.1', '18.1-18.9'],
  ['4XL', '46.1-48.0', '18.9-19.7'],
  ['5XL', '48.0-50.0', '19.7-20.5'],
  ['6XL', '50.0-52.0', '20.5-21.3'],
  ['7XL', '52.0-53.9', '21.3-22.0']
]

// 女上装(cm)
const WOMEN_TOPS_SIZE_CHART_CM = [
  [i18n.t('size.size'), i18n.t('size.bust') + '(cm)', i18n.t('size.shoulder') + '(cm)'],
  ['XXXS', '82-85', '33.0-34.0'],
  ['XXS', '85-88', '34.0-35.0'],
  ['XS', '88-91', '35.0-36.0'],
  ['S', '91-94', '36.0-38.0'],
  ['M', '94-99', '38.0-40.0'],
  ['L', '99-103', '40.0-42.0'],
  ['XL', '103-107', '42.0-44.0'],
  ['XXL', '107-112', '44.0-46.0'],
  ['XXXL', '112-117', '46.0-48.0'],
  ['4XL', '117-122', '48.0-50.0'],
  ['5XL', '122-127', '50.0-52.0'],
  ['6XL', '127-132', '52.0-54.0'],
  ['7XL', '132-137', '54.0-55.9']
]

// 女下装(in)
const WOMEN_BOTTOM_SIZE_CHART_IN = [
  [i18n.t('size.size'), i18n.t('size.waist') + '(in)', i18n.t('size.hip') + '(in)'],
  ['XXXS', '22.4-23.6', '31.5-32.7'],
  ['XXS', '23.6-24.8', '32.7-34.3'],
  ['XS', '24.8-26.4', '34.3-35.4'],
  ['S', '26.4-27.6', '35.4-36.6'],
  ['M', '27.6-28.8', '35.4-38.2'],
  ['L', '28.7-30.3', '38.2-39.4'],
  ['XL', '30.3-31.5', '39.4-40.6'],
  ['XXL', '31.5-33.1', '40.6-42.1'],
  ['XXXL', '33.1-34.6', '42.1-43.7'],
  ['4XL', '34.6-36.1', '43.7-45.3'],
  ['5XL', '36.1-37.6', '45.3-46.9'],
  ['6XL', '37.6-39.4', '46.9-48.5']
]

// 女下装(cm)
const WOMEN_BOTTOM_SIZE_CHART_CM = [
  [i18n.t('size.size'), i18n.t('size.waist') + '(cm)', i18n.t('size.hip') + '(cm)'],
  ['XXXS', '57-60', '80.0-83.1'],
  ['XXS', '60-63', '83.1-87.1'],
  ['XS', '63-67', '87.1-90.0'],
  ['S', '67-70', '90.0-93.0'],
  ['M', '70-73', '93.0-97.0'],
  ['L', '73-77', '97.0-100.1'],
  ['XL', '77-80', '100.1-103.1'],
  ['XXL', '80-84', '103.1-106.9'],
  ['XXXL', '84-88', '106.9-111.0'],
  ['4XL', '88-92', '111.0-115.1'],
  ['5XL', '92-96', '115.1-119.1'],
  ['6XL', '96-100', '119.1-123.2']
]

// 内衣(in)
const UNDERWEAR_MEASUREMENT_IN = [
  [i18n.t('size.size'), 'USA', i18n.t('size.bust') + '(in)', i18n.t('size.underbust') + '(in)', i18n.t('size.waist') + '(in)', i18n.t('size.hip') + '(in)'],
  ['XS', '32A', '31.5', '26.77-28.35', '22.8-24.41', '29.5-32.68'],
  ['XS', '32B', '32.7', '26.77-28.35', '22.8-24.41', '29.5-32.68'],
  ['XS', '32C', '33.5', '26.77-28.35', '22.8-24.41', '29.5-32.68'],
  ['S', '32D', '34.6', '26.77-28.35', '24.8-26.4', '31.5-34.65'],
  ['S', '32DD', '35.8', '26.77-28.35', '24.8-26.4', '31.5-34.65'],
  ['S', '34A', '33.5', '28.74-30.31', '24.8-26.4', '31.5-34.65'],
  ['S', '34B', '34.6', '28.74-30.31', '24.8-26.4', '31.5-34.65'],
  ['S', '34C', '35.4', '28.74-30.31', '24.8-26.4', '31.5-34.65'],
  ['M', '34D', '37.4', '28.74-30.31', '27.5-30.31', '35.4-38.58'],
  ['M', '34DD', '38.6', '28.74-30.31', '27.5-30.31', '35.4-38.58'],
  ['M', '34DDD', '39.8', '28.74-30.31', '27.5-30.31', '35.4-38.58'],
  ['M', '36A', '35.4', '30.7-32.28', '27.5-30.31', '35.4-38.58'],
  ['M', '36B', '36.6', '30.7-32.28', '27.5-30.31', '35.4-38.58'],
  ['M', '36C', '37.4', '30.7-32.28', '27.5-30.31', '35.4-38.58'],
  ['L', '36D', '38.6', '30.7-32.28', '30.7-32.3', '37.4-40.56'],
  ['L', '36DD', '40.6', '30.7-32.28', '30.7-32.3', '37.4-40.56'],
  ['L', '36DDD', '41.7', '30.7-32.28', '30.7-32.3', '37.4-40.56'],
  ['L', '38A', '37.4', '32.7-34.28', '30.7-32.3', '37.4-40.56'],
  ['L', '38B', '38.6', '32.7-34.28', '30.7-32.3', '37.4-40.56'],
  ['L', '38C', '40.16', '32.7-34.28', '30.7-32.3', '37.4-40.56'],
  ['XL', '38D', '40.94', '32.7-34.28', '39.4-42.52', '40.56-42.52'],
  ['XL', '38DD', '42.13', '32.7-34.28', '39.4-42.52', '40.56-42.52'],
  ['XL', '38DDD', '43.3', '32.7-34.28', '39.4-42.52', '40.56-42.52'],
  ['XL', '40A', '40.6', '34.64-36.22', '39.4-42.52', '40.56-42.52'],
  ['XL', '40B', '41.3', '34.64-36.22', '39.4-42.52', '40.56-42.52'],
  ['XL', '40C', '42.52', '34.64-36.22', '39.4-42.52', '40.56-42.52']
]

// 内衣(cm)
const UNDERWEAR_MEASUREMENT_CM = [
  [i18n.t('size.size'), 'USA', i18n.t('size.bust') + '(cm)', i18n.t('size.underbust') + '(cm)', i18n.t('size.waist') + '(cm)', i18n.t('size.hip') + '(cm)'],
  ['XS', '32A', '80.01', '68-72.01', '57.91-62', '74.93-83.01'],
  ['XS', '32B', '83.058', '68-72.01', '57.91-62', '74.93-83.01'],
  ['XS', '32C', '85.09', '68-72.01', '57.91-62', '74.93-83.01'],
  ['S', '32D', '87.884', '68-72.01', '62.99-67.06', '80.01-88.01'],
  ['S', '32DD', '90.932', '68-72.01', '62.99-67.06', '80.01-88.01'],
  ['S', '34A', '85.09', '73-76.99', '62.99-67.06', '80.01-88.01'],
  ['S', '34B', '87.884', '73-76.99', '62.99-67.06', '80.01-88.01'],
  ['S', '34C', '89.916', '73-76.99', '62.99-67.06', '80.01-88.01'],
  ['M', '34D', '94.996', '73-76.99', '69.85-76.99', '89.92-97.99'],
  ['M', '34DD', '98.044', '73-76.99', '69.85-76.99', '89.92-97.99'],
  ['M', '34DDD', '101.092', '73-76.99', '69.85-76.99', '89.92-97.99'],
  ['M', '36A', '89.916', '77.98-81.99', '69.85-76.99', '89.92-97.99'],
  ['M', '36B', '92.964', '77.98-81.99', '69.85-76.99', '89.92-97.99'],
  ['M', '36C', '94.996', '77.98-81.99', '69.85-76.99', '89.92-97.99'],
  ['L', '36D', '98.044', '77.98-81.99', '77.98-82.04', '95-103.02'],
  ['L', '36DD', '103.124', '77.98-81.99', '77.98-82.04', '95-103.02'],
  ['L', '36DDD', '105.918', '77.98-81.99', '77.98-82.04', '95-103.02'],
  ['L', '38A', '94.996', '83.06-87.07', '77.98-82.04', '95-103.02'],
  ['L', '38B', '98.044', '83.06-87.07', '77.98-82.04', '95-103.02'],
  ['L', '38C', '102.0064', '83.06-87.07', '77.98-82.04', '95-103.02'],
  ['XL', '38D', '103.9876', '83.06-87.07', '100.08-108', '103.02-108'],
  ['XL', '38DD', '107.0102', '83.06-87.07', '100.08-108', '103.02-108'],
  ['XL', '38DDD', '109.982', '83.06-87.07', '100.08-108', '103.02-108'],
  ['XL', '40A', '103.124', '87.99-92', '100.08-108', '103.02-108'],
  ['XL', '40B', '104.902', '87.99-92', '100.08-108', '103.02-108'],
  ['XL', '40C', '108.0008', '87.99-92', '100.08-108', '103.02-108']
]

// 泳衣(in)
const SWIMWEAR_SIZE_CHART_IN = [
  [i18n.t('size.size'), i18n.t('size.bust') + '(in)', i18n.t('size.shoulder') + '(in)'],
  ['XXXS', '32.3-33.5', '13.0-13.4'],
  ['XXS', '33.5-34.6', '13.4-13.8'],
  ['XS', '34.6-35.8', '13.8-14.2'],
  ['S', '35.8-37.0', '14.2-15.0'],
  ['M', '37.0-39.0', '15.0-15.7'],
  ['L', '39.0-40.6', '15.7-16.5'],
  ['XL', '40.6-42.1', '16.5-17.3'],
  ['XXL', '42.1-44.1', '17.3-18.1'],
  ['XXXL', '44.1-46.1', '18.1-18.9'],
  ['4XL', '46.1-48.0', '18.9-19.7'],
  ['5XL', '48.0-50.0', '19.7-20.5'],
  ['6XL', '50.0-52.0', '20.5-21.3'],
  ['7XL', '52.0-53.9', '21.3-22.0']
]

// 泳衣(cm)
const SWIMWEAR_SIZE_CHART_CM = [
  [i18n.t('size.size'), i18n.t('size.bust') + '(cm)', i18n.t('size.shoulder') + '(in)'],
  ['XXXS', '82-85', '33.0-34.0'],
  ['XXS', '85-88', '34.0-35.0'],
  ['XS', '88-91', '35.0-36.0'],
  ['S', '91-94', '36.0-38.0'],
  ['M', '94-99', '38.0-40.0'],
  ['L', '99-103', '40.0-42.0'],
  ['XL', '103-107', '42.0-44.0'],
  ['XXL', '107-112', '44.0-46.0'],
  ['XXXL', '112-117', '46.0-48.0'],
  ['4XL', '117-122', '48.0-50.0'],
  ['5XL', '122-127', '50.0-52.0'],
  ['6XL', '127-132', '52.0-54.0'],
  ['7XL', '132-137', '54.0-55.9']
]

// 男鞋(in)
const MEN_SHOES_SIZE_CHART_IN = [
  ['5.5', '5', '38', '9.2-9.4'],
  ['6.5', '6', '39', '9.4-9.6'],
  ['7', '6.5', '40', '9.6-9.8'],
  ['8', '7.5', '41', '9.8-10'],
  ['8.5', '8', '42', '10-10.2'],
  ['9.5', '9', '43', '10.2-10.4'],
  ['10', '9.5', '44', '10.4-10.6'],
  ['10.5', '10', '45', '10.6-10.8'],
  ['11.5', '11', '46', '10.8-11'],
  ['12.5', '12', '47', '11-11.2'],
  ['13', '13', '48', '11.2-11.4']
]

// 男鞋(cm)
const MEN_SHOES_SIZE_CHART_CM = [
  ['Size (USA)', 'Size (UK)', 'Size (EU)', 'Foot length (in cms)'],
  ['5.5', '5', '38', '23.5-24'],
  ['6.5', '6', '39', '24-24.5'],
  ['7', '6.5', '40', '24.5-25'],
  ['8', '7.5', '41', '25-25.5'],
  ['8.5', '8', '42', '25.5-26'],
  ['9.5', '9', '43', '26-26.5'],
  ['10', '9.5', '44', '26.5-27'],
  ['10.5', '10', '45', '27-27.5'],
  ['11.5', '11', '46', '27.5-28'],
  ['12.5', '12', '47', '28-28.5'],
  ['13', '13', '48', '28.5-29']
]

// 女鞋(in)
const WOMEN_SHOES_SIZE_CHART_IN = [
  ['Size (USA)', 'Size (UK)', 'Size (EU)', 'Foot length (in inches)'],
  ['5', '2.5', '35', '8.66-8.86'],
  ['5.5', '3', '36', '8.9-9.1'],
  ['6', '3.5', '37', '9.1-9.3'],
  ['6.5', '4', '38', '9.3-9.4'],
  ['7', '4.5', '39', '9.4-9.6'],
  ['8', '5.5', '40', '9.6-9.8'],
  ['9', '6.5', '41', '9.8-10'],
  ['10', '7.5', '42', '10-10.2'],
  ['11', '8.5', '43', '10.2-10.4'],
  ['12', '9.5', '44', '10.4-10.6'],
  ['13', '10.5', '45', '10.6-10.8']
]

// 女鞋(cm)
const WOMEN_SHOES_SIZE_CHART_CM = [
  ['Size (USA)', 'Size (UK)', 'Size (EU)', 'Foot length (in cms)'],
  ['5', '2.5', '35', '22-22.5'],
  ['5.5', '3', '36', '22.5-23'],
  ['6', '3.5', '37', '23-23.5'],
  ['6.5', '4', '38', '23.5-24'],
  ['7', '4.5', '39', '24-24.5'],
  ['8', '5.5', '40', '24.5-25'],
  ['9', '6.5', '41', '25-25.5'],
  ['10', '7.5', '42', '25.5-26'],
  ['11', '8.5', '43', '26-26.5'],
  ['12', '9.5', '44', '26.5-27'],
  ['13', '10.5', '45', '27-27.5']
]

// 戒指
const RING_SIZE_CHART = [
  [i18n.t('size.size'), i18n.t('size.diameter') + '(in)', i18n.t('size.diameter') + '(cm)'],
  ['5', '0.61', '1.55'],
  ['6', '0.62', '1.57'],
  ['7', '0.66', '1.7'],
  ['8', '0.71', '1.8'],
  ['9', '0.75', '1.9'],
  ['10', '0.78', '2.0'],
  ['11', '0.81', '2.06'],
  ['12', '0.84', '2.14'],
  ['13', '0.87', '2.2'],
  ['14', '0.91', '2.3'],
  ['15', '0.94', '2.4']
]

// 女童(in)
const GIRLS_CLOTHING_SIZE_CHART_IN = [
  [i18n.t('size.size'), i18n.t('size.height') + '(in)', i18n.t('size.weight') + '(lbs)', i18n.t('size.age'), i18n.t('size.bust') + '(in)', i18n.t('size.waist') + '(in)'],
  ['90cm', '30-33', '22-28', '18-24M', '22-24', '15-16'],
  ['100cm', '33-37', '28-33', '2-3T', '24-26', '16-17'],
  ['110cm', '37-41', '33-35', '4-5T', '26-27', '17-18'],
  ['120cm', '41-45', '35-42', '5-6T', '27-28', '18-19'],
  ['130cm', '45-49', '42-53', '7-8T', '29-30', '19-20'],
  ['140cm', '49-53', '53-59', '9-10T', '30-32', '20-21'],
  ['150cm', '53-57', '59-68', '10-11T', '32-33', '21-22']
]

// 女童(cm)
const GIRLS_CLOTHING_SIZE_CHART_CM = [
  [i18n.t('size.size'), i18n.t('size.height') + '(cm)', 'Weight(kg)', i18n.t('size.age'), i18n.t('size.bust') + '(cm)', i18n.t('size.waist') + '(cm)'],
  ['90cm', '76-85', '10-13', '18-24M', '57-61', '40-42'],
  ['100cm', '86-94', '13-15', '2-3T', '61-65', '42-44'],
  ['110cm', '95-105', '15-16', '4-5T', '68-70', '44-46'],
  ['120cm', '105-115', '16-19', '5-6T', '70-73', '46-48'],
  ['130cm', '116-126', '19-24', '7-8T', '74-77', '48-50'],
  ['140cm', '126-136', '24-27', '9-10T', '78-81', '51-53'],
  ['150cm', '136-146', '27-31', '10-11T', '82-85', '54-56']
]

// 男童(in)
const BOYS_CLOTHING_SIZE_CHART_IN = [
  [i18n.t('size.size'), i18n.t('size.height') + '(in)', 'Weight(ibs)', i18n.t('size.age'), i18n.t('size.bust') + '(in)', i18n.t('size.waist') + '(in)'],
  ['90cm', '31-35', '22-28', '18-24M', '23-24', '16-16.9'],
  ['100cm', '35-38', '28-33', '2-3T', '24-26', '16.9-17.7'],
  ['110cm', '38-42', '33-37', '4-5T', '27-28', '17.7-18.5'],
  ['120cm', '42-46', '37-44', '5-6T', '28-29', '18.5-19.2'],
  ['130cm', '46-50', '44-53', '7-8T', '29-30', '19.3-20'],
  ['140cm', '50-54', '53-61', '9-10T', '30-32', '20-21'],
  ['150cm', '54-58', '61-70', '10-11T', '32-34', '22-23']
]
// 男童(cm)
const BOYS_CLOTHING_SIZE_CHART_CM = [
  [i18n.t('size.size'), i18n.t('size.height') + '(cm)', 'Weight(kg)', i18n.t('size.age'), i18n.t('size.bust') + '(cm)', i18n.t('size.waist') + '(cm)'],
  ['90cm', '78-89', '10-13', '18-24M', '58-62', '41-43'],
  ['100cm', '90-98', '13-16', '2-3T', '62-66', '43-45'],
  ['110cm', '98-108', '15-17', '4-5T', '69-71', '45-47'],
  ['120cm', '108-118', '17-20', '5-6T', '71-74', '47-49'],
  ['130cm', '118-128', '20-24', '7-8T', '75-78', '49-51'],
  ['140cm', '128-138', '24-28', '9-10T', '79-82', '52-54'],
  ['150cm', '138-148', '28-32', '10-11T', '83-86', '56-58']
]

// 婴儿(in)
const BABY_CLOTHING_SIZE_CHART_IN = [
  [i18n.t('size.size'), 'Reference Height(in)', 'Weight(ibs)', i18n.t('size.age'), i18n.t('size.bust') + '(in)', i18n.t('size.waist') + '(in)'],
  ['52cm', '19-20', '0-5', 'NB', '18-19', '12-12.6'],
  ['59cm', '20-23', '5-6', '0-3M', '19-19.7', '12.6-13.3'],
  ['66cm', '23-26', '6-8', '3-6M', '19.7-20.5', '13.7-14.2'],
  ['73cm', '26-29', '8-9', '6-9M', '20.5-21', '14.2-15'],
  ['80cm', '29-31', '9-10', '9-12M', '21-22.5', '15-15.7'],
  ['90cm', '31-34', '10-12', '18-24M', '22.5-24', '16-16.5'],
  ['100cm', '34-37', '13-15', '2-3T', '24-25.6', '16.5-17.3']
]

// 婴儿(cm)
const BABY_CLOTHING_SIZE_CHART_CM = [
  [i18n.t('size.size'), 'Reference Height(cm)', 'Weight(kg)', i18n.t('size.age'), i18n.t('size.bust') + '(cm)', i18n.t('size.waist') + '(cm)'],
  ['52cm', '48-52', '0-5', 'NB', '46-48', '31-32'],
  ['59cm', '52-59', '5-6', '0-3M', '48-50', '33-34'],
  ['66cm', '60-66', '6-8', '3-6M', '50-52', '35-36'],
  ['73cm', '67-73', '8-9', '6-9M', '52-53', '37-38'],
  ['80cm', '74-80', '9-10', '9-12M', '53-57', '39-40'],
  ['90cm', '80-86', '10-12', '18-24M', '57-62', '41-42'],
  ['100cm', '86-94', '13-15', '2-3T', '61-65', '42-44']
]

// 童鞋
const KIDS_SHOES_SIZE_CHART = [
  [i18n.t('size.size') + ' USA', i18n.t('size.size') + ' UK', i18n.t('size.insole') + '(in)', i18n.t('size.insole') + '(cm)'],
  ['1.5C', '0.5C', '3.5', '9.0'],
  ['2C', '1C', '3.7', '9.5'],
  ['2.5C', '1.5C', '3.9', '10.0'],
  ['3C', '2C', '4.1', '10.5'],
  ['3.5C', '2.5C', '4.3', '11.0'],
  ['4C', '3C', '4.5', '11.5'],
  ['5C', '4C', '4.7', '12.0'],
  ['5.5C', '4.5C', '4.9', '12.5'],
  ['6C', '5C', '5.1', '13.0'],
  ['6.5C', '5.5C', '5.3', '13.5'],
  ['7C', '6C', '5.5', '14.0'],
  ['7.5C', '6.5C', '5.7', '14.5'],
  ['8C', '7C', '5.9', '15.0'],
  ['8.5C', '7.5C', '6.1', '15.5'],
  ['9C', '8C', '6.3', '16.0'],
  ['9.5C', '8.5C', '6.5', '16.5'],
  ['10C', '9C', '6.7', '17.0'],
  ['10.5C', '9.5C', '6.9', '17.5'],
  ['11C', '10C', '7.1', '18.0'],
  ['11.5C', '10.5C', '7.3', '18.5'],
  ['12C', '11C', '7.5', '19.0'],
  ['12.5C', '11.5C', '7.7', '19.5'],
  ['13C', '12C', '7.9', '20.0'],
  ['13.5C', '12.5', '8.1', '20.5'],
  ['1.0', '13.0', '8.3', '21.0'],
  ['1.5', '14.0', '8.5', '21.5']
]

// # 宠物(in)
const PET_CLOTHING_SIZE_CHART_IN = [
  ['Size', 'Bust/Chest(in)', 'Back Lenght(in)'],
  ['XXS', '10.24-11.81', '7.87-8.66'],
  ['XS', '12.20-13.39', '9.06-9.45'],
  ['S', '13.78-16.54', '9.84-11.42'],
  ['M', '16.93-19.29', '11.81-13.39'],
  ['L', '19.69-22.05', '13.78-15.35'],
  ['XL', '22.44-24.80', '15.75-17.32'],
  ['2XL', '25.20-27.56', '17.72-19.29'],
  ['3XL', '27.95-29.53', '19.69-21.26'],
  ['4XL', '29.92-31.89', '21.65-23.23'],
  ['5XL', '32.28-33.46', '23.62-25.2'],
  ['6XL', '33.86-35.04', '25.59-27.17'],
  ['7XL', '35.43-36.22', '27.56-29.13']
]

// # 宠物(cm)
const PET_CLOTHING_SIZE_CHART_CM = [
  ['Size', 'Bust/Chest(cm)', 'Back Lenght(cm)'],
  ['XXS', '26-30', '20-22'],
  ['XS', '31-34', '23-24'],
  ['S', '35-42', '25-29'],
  ['M', '43-49', '30-34'],
  ['L', '50-56', '35-39'],
  ['XL', '57-63', '40-44'],
  ['2XL', '64-70', '45-49'],
  ['3XL', '71-75', '50-54'],
  ['4XL', '76-81', '55-59'],
  ['5XL', '82-85', '60-64'],
  ['6XL', '86-89', '65-69'],
  ['7XL', '90-92', '70-74']
]

// # 男套装(in)
const MEN_SUIT_SIZE_CHART_IN = [
  ['Size', 'Chest/Bust（in Inches）', 'Shoulder width（in inches）', 'Waist (in inches)', 'Hip（in inches）'],
  ['XXXS', '32.3-33.5', '15.7-16.1', '27.6-28.7', '36.7-38.2'],
  ['XXS', '33.5-34.6', '16.1-16.5', '28.7-30.3', '38.2-39.4'],
  ['XS', '34.6-35.8', '16.5-16.9', '30.3-31.5', '39.4-40.6'],
  ['S', '35.8-37', '16.9-17.3', '31.5-32.7', '40.6-42.1'],
  ['M', '37-38.6', '17.3-17.7', '32.7-34.3', '42.1-43.3'],
  ['L', '38.6-40.2', '17.7-18.1', '34.3-35.4', '43.3-44.5'],
  ['XL', '40.2-42.1', '18.1-18.5', '35.4-36.6', '44.5-46.1'],
  ['XXL', '42.1-44.1', '18.5-18.9', '36.6-38.2', '46.1-48.4'],
  ['XXXL', '44.1-46.1', '18.9-19.3', '38.2-40.0', '48.4-50.0'],
  ['4XL', '46.1-48.4', '19.3-19.7', '40.0-42.0', '50.0-51.2'],
  ['5XL', '48.4-50.8', '19.7-20.3', '42.0-44.0', '51.2-53.5'],
  ['6XL', '50.8-53.1', '20.3-20.9', '44.0-46.0', '53.5-55.5']
]

// # 男套装(cm)
const MEN_SUIT_SIZE_CHART_CM = [
  ['Size', 'Chest/Bust(in cms)', 'Shoulder width(in cms)', 'Waist(in cms)', 'Hip(in cms)'],
  ['XXXS', '82-85', '39.9-40.9', '70-73', '93-97'],
  ['XXS', '85-88', '40.9-41.9', '73-77', '97-100'],
  ['XS', '88-91', '41.9-42.9', '77-80', '100-103'],
  ['S', '91-94', '42.9-43.9', '80-83', '103-107'],
  ['M', '94-98', '43.9-45.0', '83-87', '107-110'],
  ['L', '98-102', '45.0-46.0', '87-90', '110-113'],
  ['XL', '102-107', '46.0-47.0', '90-93', '113-117'],
  ['XXL', '107-112', '47.0-48.0', '93-97', '117-123'],
  ['XXXL', '112-117', '48.0-49.0', '97-102', '123-127'],
  ['4XL', '117-123', '49.0-50.0', '102-107', '127-131'],
  ['5XL', '123-129', '50.0-51.5', '107-112', '131-136'],
  ['6XL', '129-135', '51.5-53', '112-117', '136-141']
]

// # 孕妇装(上装in)
const GRAVIDA_CLOTHING_SIZE_CHART_TOPS_IN = [
  ['Size', 'Bust(in)', 'Waist(in)'],
  ['M', '39-40', '38-39'],
  ['L', '40-42', '39-41'],
  ['XL', '42-44', '41-43'],
  ['XXL', '44-46', '43-45']
]

// # 孕妇装(上装cm)
const GRAVIDA_CLOTHING_SIZE_CHART_TOPS_CM = [
  ['Size', 'Bust(cm)', 'Waist(cm)'],
  ['M', '99-102', '97-99'],
  ['L', '102-107', '99-104'],
  ['XL', '107-112', '104-109'],
  ['XXL', '112-117', '109-114']
]

// # 孕妇装(下装in)
const GRAVIDA_CLOTHING_SIZE_CHART_BOTTOMS_IN = [
  ['Size', 'Waist(in)', 'Hip(in)'],
  ['L', '26-42', '35-37'],
  ['XL', '28-43', '37-39'],
  ['XXL', '30-45', '39-41'],
  ['3XL', '31-47', '41-43']
]

// # 孕妇装(下装cm)
const GRAVIDA_CLOTHING_SIZE_CHART_BOTTOMS_CM = [
  ['Size', 'Waist(cm)', 'Hip(cm)'],
  ['L', '66-106', '90-94'],
  ['XL', '70-110', '95-99'],
  ['XXL', '75-115', '100-104'],
  ['3XL', '80-120', '105-109']
]

const SIZE_CHART_MAP = {
  'men_clothing_size_in': {
    'display_name': 'Men Clothing Size',
    'size_type': 'in',
    'data': MEN_CLOTHING_SIZE_CHART_IN
  },
  'men_clothing_size_cm': {
    'display_name': 'Men Clothing Size',
    'size_type': 'cm',
    'data': MEN_CLOTHING_SIZE_CHART_CM
  },
  'men_pants_size_in': {
    'display_name': 'Men Pants Size',
    'size_type': 'in',
    'data': MEN_PANTS_SIZE_CHART_IN
  },
  'men_pants_size_cm': {
    'display_name': 'Men Pants Size',
    'size_type': 'cm',
    'data': MEN_PANTS_SIZE_CHART_CM
  },

  'women_tops_size_in': {
    'display_name': 'Women Tops Size',
    'size_type': 'in',
    'data': WOMEN_TOPS_SIZE_CHART_IN
  },
  'women_tops_size_cm': {
    'display_name': 'Women Tops Size',
    'size_type': 'cm',
    'data': WOMEN_TOPS_SIZE_CHART_CM
  },

  'women_bottom_size_in': {
    'display_name': 'Women Bottom Size',
    'size_type': 'in',
    'data': WOMEN_BOTTOM_SIZE_CHART_IN
  },
  'women_bottom_size_cm': {
    'display_name': 'Women Bottom Size',
    'size_type': 'cm',
    'data': WOMEN_BOTTOM_SIZE_CHART_CM
  },

  'underwear_size_in': {
    'display_name': 'Underwear Size',
    'size_type': 'in',
    'data': UNDERWEAR_MEASUREMENT_IN
  },
  'underwear_size_cm': {
    'display_name': 'Underwear Size',
    'size_type': 'cm',
    'data': UNDERWEAR_MEASUREMENT_CM
  },

  'swimwear_size_in': {
    'display_name': 'Swimwear Size',
    'size_type': 'in',
    'data': SWIMWEAR_SIZE_CHART_IN
  },
  'swimwear_size_cm': {
    'display_name': 'Swimwear Size',
    'size_type': 'cm',
    'data': SWIMWEAR_SIZE_CHART_CM
  },

  'men_shoes_size_cm': {
    'display_name': 'Men Shoes Size',
    'size_type': 'cm',
    'data': MEN_SHOES_SIZE_CHART_CM
  },

  'men_shoes_size_in': {
    'display_name': 'Men Shoes Size',
    'size_type': 'in',
    'data': MEN_SHOES_SIZE_CHART_IN
  },

  'women_shoes_size_cm': {
    'display_name': 'Women Shoes Size',
    'size_type': 'cm',
    'data': WOMEN_SHOES_SIZE_CHART_CM
  },

  'women_shoes_size_in': {
    'display_name': 'Women Shoes Size',
    'size_type': 'in',
    'data': WOMEN_SHOES_SIZE_CHART_IN
  },

  'ring_size': {
    'display_name': 'Ring Size',
    'size_type': '',
    'data': RING_SIZE_CHART
  },

  'girls_clothing_size_in': {
    'display_name': 'Girls Clothing Size',
    'size_type': 'in',
    'data': GIRLS_CLOTHING_SIZE_CHART_IN
  },

  'girls_clothing_size_cm': {
    'display_name': 'Girls Clothing Size',
    'size_type': 'cm',
    'data': GIRLS_CLOTHING_SIZE_CHART_CM
  },

  'boys_clothing_size_in': {
    'display_name': 'Boys Clothing Size',
    'size_type': 'in',
    'data': BOYS_CLOTHING_SIZE_CHART_IN
  },
  'boys_clothing_size_cm': {
    'display_name': 'Boys Clothing Size',
    'size_type': 'cm',
    'data': BOYS_CLOTHING_SIZE_CHART_CM
  },

  'baby_clothing_size_in': {
    'display_name': 'Baby Clothing Size',
    'size_type': 'in',
    'data': BABY_CLOTHING_SIZE_CHART_IN
  },
  'baby_clothing_size_cm': {
    'display_name': 'Baby Clothing Size',
    'size_type': 'cm',
    'data': BABY_CLOTHING_SIZE_CHART_CM
  },

  'kids_shoes_size': {
    'display_name': 'Kids Shoes Size',
    'size_type': '',
    'data': KIDS_SHOES_SIZE_CHART
  },

  'pet_clothing_size_in': {
    'display_name': 'Pet Clothing Size',
    'size_type': 'in',
    'data': PET_CLOTHING_SIZE_CHART_IN
  },

  'pet_clothing_size_cm': {
    'display_name': 'Pet Clothing Size',
    'size_type': 'cm',
    'data': PET_CLOTHING_SIZE_CHART_CM
  },

  'men_suit_size_in': {
    'display_name': 'Men Suit Size',
    'size_type': 'in',
    'data': MEN_SUIT_SIZE_CHART_IN
  },

  'men_suit_size_cm': {
    'display_name': 'Men Suit Size',
    'size_type': 'cm',
    'data': MEN_SUIT_SIZE_CHART_CM
  },

  'gravida_clothing_size_tops_in': {
    'display_name': 'Gravida Tops Size',
    'size_type': 'in',
    'data': GRAVIDA_CLOTHING_SIZE_CHART_TOPS_IN
  },

  'gravida_clothing_size_tops_cm': {
    'display_name': 'Gravida Tops Size',
    'size_type': 'cm',
    'data': GRAVIDA_CLOTHING_SIZE_CHART_TOPS_CM
  },

  'gravida_clothing_size_bottoms_in': {
    'display_name': 'Gravida Bottoms Size',
    'size_type': 'in',
    'data': GRAVIDA_CLOTHING_SIZE_CHART_BOTTOMS_IN
  },

  'gravida_clothing_size_bottoms_cm': {
    'display_name': 'Gravida Bottoms Size',
    'size_type': 'cm',
    'data': GRAVIDA_CLOTHING_SIZE_CHART_BOTTOMS_CM
  }
}

const CATEGORY_ID_TO_SIZE_CHART = {
  // 男裤
  '100003086': ['men_pants_size_in', 'men_pants_size_cm'],
  '100003088': ['men_pants_size_in', 'men_pants_size_cm'],
  '200118008': ['men_pants_size_in', 'men_pants_size_cm'],
  '200000706': ['men_pants_size_in', 'men_pants_size_cm'],
  '200000708': ['men_pants_size_in', 'men_pants_size_cm'],
  // 男装
  '200000692': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '200000701': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '200000662': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '200000707': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '200000668': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '100003084': ['men_clothing_size_in', 'men_clothing_size_cm'],
  // 女装泳衣
  // '200000784': ['swimwear_size_in', 'swimwear_size_cm'],
  // 女上装
  '200000775': ['women_tops_size_in', 'women_tops_size_cm'],
  '200003482': ['women_tops_size_in', 'women_tops_size_cm'],
  '200000777': ['women_tops_size_in', 'women_tops_size_cm'],
  '100003141': ['women_tops_size_in', 'women_tops_size_cm'],
  '200001648': ['women_tops_size_in', 'women_tops_size_cm'],
  '200000782': ['women_tops_size_in', 'women_tops_size_cm'],
  '200000783': ['women_tops_size_in', 'women_tops_size_cm'],
  '200000784': ['women_tops_size_in', 'women_tops_size_cm'],
  '200000785': ['women_tops_size_in', 'women_tops_size_cm'],
  // 女装内衣
  '200000773': ['underwear_size_in', 'underwear_size_cm'],
  // 女下装
  '200118010': ['women_bottom_size_in', 'women_bottom_size_cm'],
  '200001092': ['women_bottom_size_in', 'women_bottom_size_cm'],
  // 男鞋
  '100001617': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '200002253': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '100001618': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '100001619': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '200002158': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '200002118': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '100001620': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '200002136': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '200002148': ['men_shoes_size_in', 'men_shoes_size_cm'],
  // 女鞋
  '200002164': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '200003334': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '200002155': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '200002157': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '100001607': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '100001610': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '200002160': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '100001611': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '200002161': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '100001612': ['women_shoes_size_in', 'women_shoes_size_cm'],
  // 戒指
  '100006749': ['ring_size'],
  // 女童装
  '100003199': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  // 男童装
  '100003186': ['boys_clothing_size_in', 'boys_clothing_size_cm'],
  // 婴儿
  '200000567': ['baby_clothing_size_in', 'baby_clothing_size_cm'],
  '200000528': ['baby_clothing_size_in', 'baby_clothing_size_cm'],
  // 童鞋
  '200002101': ['kids_shoes_size'],
  '32212': ['kids_shoes_size'],

  // 以下为升级为三级品类后的对应关系
  // 女上装
  '60101': ['women_tops_size_in', 'women_tops_size_cm'],
  '60103': ['women_tops_size_in', 'women_tops_size_cm'],
  '60104': ['women_tops_size_in', 'women_tops_size_cm'],
  '60105': ['women_tops_size_in', 'women_tops_size_cm'],
  '60106': ['women_tops_size_in', 'women_tops_size_cm'],
  '60107': ['women_tops_size_in', 'women_tops_size_cm'],
  '60108001': ['women_tops_size_in', 'women_tops_size_cm'],
  '60108002': ['women_tops_size_in', 'women_tops_size_cm'],
  '60108003': ['women_tops_size_in', 'women_tops_size_cm'],
  '60108004': ['women_tops_size_in', 'women_tops_size_cm'],
  '60109': ['women_tops_size_in', 'women_tops_size_cm'],
  '60110': ['women_tops_size_in', 'women_tops_size_cm'],
  '60111': ['women_tops_size_in', 'women_tops_size_cm'],
  '60112': ['women_tops_size_in', 'women_tops_size_cm'],
  '60113': ['women_tops_size_in', 'women_tops_size_cm'],
  '60114': ['women_tops_size_in', 'women_tops_size_cm'],
  '60115': ['women_tops_size_in', 'women_tops_size_cm'],
  '60116005': ['women_tops_size_in', 'women_tops_size_cm'],
  '60116006': ['women_tops_size_in', 'women_tops_size_cm'],
  '60117007': ['women_tops_size_in', 'women_tops_size_cm'],
  '60117008': ['women_tops_size_in', 'women_tops_size_cm'],
  '60118': ['women_tops_size_in', 'women_tops_size_cm'],
  '60119': ['women_tops_size_in', 'women_tops_size_cm'],
  '60120': ['women_tops_size_in', 'women_tops_size_cm'],
  '60124014': ['women_tops_size_in', 'women_tops_size_cm'],
  '60124016': ['women_tops_size_in', 'women_tops_size_cm'],
  '60124017': ['women_tops_size_in', 'women_tops_size_cm'],
  '60124018': ['women_tops_size_in', 'women_tops_size_cm'],
  '60124019': ['women_tops_size_in', 'women_tops_size_cm'],
  '60124020': ['women_tops_size_in', 'women_tops_size_cm'],
  '60124021': ['women_tops_size_in', 'women_tops_size_cm'],
  '60124022': ['women_tops_size_in', 'women_tops_size_cm'],
  '60124023': ['women_tops_size_in', 'women_tops_size_cm'],
  '60124024': ['women_tops_size_in', 'women_tops_size_cm'],
  '60124025': ['women_tops_size_in', 'women_tops_size_cm'],
  '60124026': ['women_tops_size_in', 'women_tops_size_cm'],
  '60124027': ['women_tops_size_in', 'women_tops_size_cm'],
  '60124028': ['women_tops_size_in', 'women_tops_size_cm'],
  '60124029': ['women_tops_size_in', 'women_tops_size_cm'],
  '60124030': ['women_tops_size_in', 'women_tops_size_cm'],
  '60124031': ['women_tops_size_in', 'women_tops_size_cm'],
  '60124036': ['women_tops_size_in', 'women_tops_size_cm'],
  '60124037': ['women_tops_size_in', 'women_tops_size_cm'],
  '60124038': ['women_tops_size_in', 'women_tops_size_cm'],
  '60125': ['women_tops_size_in', 'women_tops_size_cm'],
  '60126039': ['women_tops_size_in', 'women_tops_size_cm'],
  '60126040': ['women_tops_size_in', 'women_tops_size_cm'],
  '60127041': ['women_tops_size_in', 'women_tops_size_cm'],
  '60127043': ['women_tops_size_in', 'women_tops_size_cm'],
  '60127044': ['women_tops_size_in', 'women_tops_size_cm'],
  '60127045': ['women_tops_size_in', 'women_tops_size_cm'],
  '60504042': ['women_tops_size_in', 'women_tops_size_cm'],
  '60504044': ['women_tops_size_in', 'women_tops_size_cm'],
  '60504045': ['women_tops_size_in', 'women_tops_size_cm'],
  '60504047': ['women_tops_size_in', 'women_tops_size_cm'],
  '60504048': ['women_tops_size_in', 'women_tops_size_cm'],
  '60505049': ['women_tops_size_in', 'women_tops_size_cm'],
  '60505052': ['women_tops_size_in', 'women_tops_size_cm'],
  '60505053': ['women_tops_size_in', 'women_tops_size_cm'],
  '60506055': ['women_tops_size_in', 'women_tops_size_cm'],
  '60506057': ['women_tops_size_in', 'women_tops_size_cm'],
  '60507065': ['women_tops_size_in', 'women_tops_size_cm'],
  '60507066': ['women_tops_size_in', 'women_tops_size_cm'],
  '60509074': ['women_tops_size_in', 'women_tops_size_cm'],
  '60509080': ['women_tops_size_in', 'women_tops_size_cm'],
  '60509083': ['women_tops_size_in', 'women_tops_size_cm'],
  '60509084': ['women_tops_size_in', 'women_tops_size_cm'],
  '60509087': ['women_tops_size_in', 'women_tops_size_cm'],
  '60511': ['women_tops_size_in', 'women_tops_size_cm'],
  '60512': ['women_tops_size_in', 'women_tops_size_cm'],
  '62601023': ['women_tops_size_in', 'women_tops_size_cm'],
  '62601027': ['women_tops_size_in', 'women_tops_size_cm'],
  '62601030': ['women_tops_size_in', 'women_tops_size_cm'],
  '62601033': ['women_tops_size_in', 'women_tops_size_cm'],
  '62601036': ['women_tops_size_in', 'women_tops_size_cm'],
  '62601039': ['women_tops_size_in', 'women_tops_size_cm'],
  '62601042': ['women_tops_size_in', 'women_tops_size_cm'],
  '62601045': ['women_tops_size_in', 'women_tops_size_cm'],
  '62601048': ['women_tops_size_in', 'women_tops_size_cm'],
  '62603115': ['women_tops_size_in', 'women_tops_size_cm'],
  '62603116': ['women_tops_size_in', 'women_tops_size_cm'],
  '62603117': ['women_tops_size_in', 'women_tops_size_cm'],
  '62603186': ['women_tops_size_in', 'women_tops_size_cm'],
  '62604003': ['women_tops_size_in', 'women_tops_size_cm'],
  '62604004': ['women_tops_size_in', 'women_tops_size_cm'],
  '62604005': ['women_tops_size_in', 'women_tops_size_cm'],
  '62604008': ['women_tops_size_in', 'women_tops_size_cm'],
  '62605125': ['women_tops_size_in', 'women_tops_size_cm'],
  '62605128': ['women_tops_size_in', 'women_tops_size_cm'],
  '62605131': ['women_tops_size_in', 'women_tops_size_cm'],
  '62605135': ['women_tops_size_in', 'women_tops_size_cm'],
  '62605139': ['women_tops_size_in', 'women_tops_size_cm'],
  '62605142': ['women_tops_size_in', 'women_tops_size_cm'],
  '62605145': ['women_tops_size_in', 'women_tops_size_cm'],
  '62605148': ['women_tops_size_in', 'women_tops_size_cm'],
  '62605151': ['women_tops_size_in', 'women_tops_size_cm'],
  '62605154': ['women_tops_size_in', 'women_tops_size_cm'],
  '62611055': ['women_tops_size_in', 'women_tops_size_cm'],
  '62611059': ['women_tops_size_in', 'women_tops_size_cm'],
  '62611062': ['women_tops_size_in', 'women_tops_size_cm'],
  '62611065': ['women_tops_size_in', 'women_tops_size_cm'],
  '62611068': ['women_tops_size_in', 'women_tops_size_cm'],
  '62611071': ['women_tops_size_in', 'women_tops_size_cm'],
  '62611073': ['women_tops_size_in', 'women_tops_size_cm'],
  // 女下装
  '60102': ['women_bottom_size_in', 'women_bottom_size_cm'],
  '60121009': ['women_bottom_size_in', 'women_bottom_size_cm'],
  '60121010': ['women_bottom_size_in', 'women_bottom_size_cm'],
  '60121011': ['women_bottom_size_in', 'women_bottom_size_cm'],
  '60122': ['women_bottom_size_in', 'women_bottom_size_cm'],
  '60123012': ['women_bottom_size_in', 'women_bottom_size_cm'],
  '60123013': ['women_bottom_size_in', 'women_bottom_size_cm'],
  '60124015': ['women_bottom_size_in', 'women_bottom_size_cm'],
  '60124032': ['women_bottom_size_in', 'women_bottom_size_cm'],
  '60124033': ['women_bottom_size_in', 'women_bottom_size_cm'],
  '60124034': ['women_bottom_size_in', 'women_bottom_size_cm'],
  '60124035': ['women_bottom_size_in', 'women_bottom_size_cm'],
  '60501001': ['women_bottom_size_in', 'women_bottom_size_cm'],
  '60501002': ['women_bottom_size_in', 'women_bottom_size_cm'],
  '60501003': ['women_bottom_size_in', 'women_bottom_size_cm'],
  '60501004': ['women_bottom_size_in', 'women_bottom_size_cm'],
  '60501005': ['women_bottom_size_in', 'women_bottom_size_cm'],
  '60501006': ['women_bottom_size_in', 'women_bottom_size_cm'],
  '60501007': ['women_bottom_size_in', 'women_bottom_size_cm'],
  '60505050': ['women_bottom_size_in', 'women_bottom_size_cm'],
  '60506060': ['women_bottom_size_in', 'women_bottom_size_cm'],
  '60509071': ['women_bottom_size_in', 'women_bottom_size_cm'],
  '60509077': ['women_bottom_size_in', 'women_bottom_size_cm'],
  '62603120': ['women_bottom_size_in', 'women_bottom_size_cm'],
  '62604011': ['women_bottom_size_in', 'women_bottom_size_cm'],
  '62611051': ['women_bottom_size_in', 'women_bottom_size_cm'],
  '62611056': ['women_bottom_size_in', 'women_bottom_size_cm'],
  // 内衣
  '60502013': ['underwear_size_in', 'underwear_size_cm'],
  '60502014': ['underwear_size_in', 'underwear_size_cm'],
  '60502015': ['underwear_size_in', 'underwear_size_cm'],
  '60502016': ['underwear_size_in', 'underwear_size_cm'],
  '60502017': ['underwear_size_in', 'underwear_size_cm'],
  '60502018': ['underwear_size_in', 'underwear_size_cm'],
  '60502019': ['underwear_size_in', 'underwear_size_cm'],
  '60506061': ['underwear_size_in', 'underwear_size_cm'],
  '60507064': ['underwear_size_in', 'underwear_size_cm'],
  '61503023': ['underwear_size_in', 'underwear_size_cm'],
  // 宠物
  '60301011': ['pet_clothing_size_in', 'pet_clothing_size_cm'],
  '60308087': ['pet_clothing_size_in', 'pet_clothing_size_cm'],
  // 男装
  '60504043': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60504046': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60506054': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60507062': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60509078': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60509079': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60509081': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60509082': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60509085': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60509086': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60510': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60701': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60702': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60703': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60704001': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60704002': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60704003': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60704004': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60705005': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60705006': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60705007': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60705008': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60705009': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60705010': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60705011': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60707012': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60707013': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60708': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60710': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60711': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60712014': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60712015': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60712016': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60713017': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60713018': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60714': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60717': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60718': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60719': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60720': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60721': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '60725': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62601022': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62601026': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62601029': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62601032': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62601035': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62601038': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62601041': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62601043': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62601046': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62603118': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62604001': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62604006': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62605124': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62605127': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62605130': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62605134': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62605138': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62605141': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62605144': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62605147': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62605150': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62605153': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62611054': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62611057': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62611061': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62611064': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62611067': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62611070': ['men_clothing_size_in', 'men_clothing_size_cm'],
  '62611072': ['men_clothing_size_in', 'men_clothing_size_cm'],
  // 男裤
  '60501008': ['men_pants_size_in', 'men_pants_size_cm'],
  '60501009': ['men_pants_size_in', 'men_pants_size_cm'],
  '60501010': ['men_pants_size_in', 'men_pants_size_cm'],
  '60501011': ['men_pants_size_in', 'men_pants_size_cm'],
  '60501012': ['men_pants_size_in', 'men_pants_size_cm'],
  '60506059': ['men_pants_size_in', 'men_pants_size_cm'],
  '60509075': ['men_pants_size_in', 'men_pants_size_cm'],
  '60509076': ['men_pants_size_in', 'men_pants_size_cm'],
  '60715': ['men_pants_size_in', 'men_pants_size_cm'],
  '60722': ['men_pants_size_in', 'men_pants_size_cm'],
  '60723': ['men_pants_size_in', 'men_pants_size_cm'],
  '60724': ['men_pants_size_in', 'men_pants_size_cm'],
  '60726': ['men_pants_size_in', 'men_pants_size_cm'],
  '60727': ['men_pants_size_in', 'men_pants_size_cm'],
  '60728': ['men_pants_size_in', 'men_pants_size_cm'],
  '62603119': ['men_pants_size_in', 'men_pants_size_cm'],
  '62604009': ['men_pants_size_in', 'men_pants_size_cm'],
  '62611049': ['men_pants_size_in', 'men_pants_size_cm'],
  // 男套装
  '60506056': ['men_suit_size_in', 'men_suit_size_cm'],
  '60509072': ['men_suit_size_in', 'men_suit_size_cm'],
  '60509073': ['men_suit_size_in', 'men_suit_size_cm'],
  '60709': ['men_suit_size_in', 'men_suit_size_cm'],
  '60716': ['men_suit_size_in', 'men_suit_size_cm'],
  '60729': ['men_suit_size_in', 'men_suit_size_cm'],
  // 情侣装（使用男女上装尺码）
  '60127042': ['men_clothing_size_in', 'women_clothing_size_in', 'men_clothing_size_cm', 'women_clothing_size_cm'],
  '60706': ['men_clothing_size_in', 'women_clothing_size_in', 'men_clothing_size_cm', 'women_clothing_size_cm'],
  '62507032': ['men_clothing_size_in', 'women_clothing_size_in', 'men_clothing_size_cm', 'women_clothing_size_cm'],
  '62507046': ['men_clothing_size_in', 'women_clothing_size_in', 'men_clothing_size_cm', 'women_clothing_size_cm'],
  '62601024': ['men_clothing_size_in', 'women_clothing_size_in', 'men_clothing_size_cm', 'women_clothing_size_cm'],
  '62601167': ['men_clothing_size_in', 'women_clothing_size_in', 'men_clothing_size_cm', 'women_clothing_size_cm'],
  '62601168': ['men_clothing_size_in', 'women_clothing_size_in', 'men_clothing_size_cm', 'women_clothing_size_cm'],
  '62601169': ['men_clothing_size_in', 'women_clothing_size_in', 'men_clothing_size_cm', 'women_clothing_size_cm'],
  '62601170': ['men_clothing_size_in', 'women_clothing_size_in', 'men_clothing_size_cm', 'women_clothing_size_cm'],
  '62601171': ['men_clothing_size_in', 'women_clothing_size_in', 'men_clothing_size_cm', 'women_clothing_size_cm'],
  '62601172': ['men_clothing_size_in', 'women_clothing_size_in', 'men_clothing_size_cm', 'women_clothing_size_cm'],
  '62603113': ['men_clothing_size_in', 'women_clothing_size_in', 'men_clothing_size_cm', 'women_clothing_size_cm'],
  '62605132': ['men_clothing_size_in', 'women_clothing_size_in', 'men_clothing_size_cm', 'women_clothing_size_cm'],
  '62605136': ['men_clothing_size_in', 'women_clothing_size_in', 'men_clothing_size_cm', 'women_clothing_size_cm'],
  '62605189': ['men_clothing_size_in', 'women_clothing_size_in', 'men_clothing_size_cm', 'women_clothing_size_cm'],
  '62611052': ['men_clothing_size_in', 'women_clothing_size_in', 'men_clothing_size_cm', 'women_clothing_size_cm'],
  '62611173': ['men_clothing_size_in', 'women_clothing_size_in', 'men_clothing_size_cm', 'women_clothing_size_cm'],
  '62611174': ['men_clothing_size_in', 'women_clothing_size_in', 'men_clothing_size_cm', 'women_clothing_size_cm'],
  '62611175': ['men_clothing_size_in', 'women_clothing_size_in', 'men_clothing_size_cm', 'women_clothing_size_cm'],
  // 男童装
  '61102': ['boys_clothing_size_in', 'boys_clothing_size_cm'],
  '61105': ['boys_clothing_size_in', 'boys_clothing_size_cm'],
  '61109': ['boys_clothing_size_in', 'boys_clothing_size_cm'],
  '61113': ['boys_clothing_size_in', 'boys_clothing_size_cm'],
  '61115': ['boys_clothing_size_in', 'boys_clothing_size_cm'],
  '61118': ['boys_clothing_size_in', 'boys_clothing_size_cm'],
  '61125': ['boys_clothing_size_in', 'boys_clothing_size_cm'],
  '61128': ['boys_clothing_size_in', 'boys_clothing_size_cm'],
  '61131': ['boys_clothing_size_in', 'boys_clothing_size_cm'],
  '61134': ['boys_clothing_size_in', 'boys_clothing_size_cm'],
  '61137': ['boys_clothing_size_in', 'boys_clothing_size_cm'],
  '61140': ['boys_clothing_size_in', 'boys_clothing_size_cm'],
  '61143': ['boys_clothing_size_in', 'boys_clothing_size_cm'],
  '61146': ['boys_clothing_size_in', 'boys_clothing_size_cm'],
  '61149': ['boys_clothing_size_in', 'boys_clothing_size_cm'],
  '61152': ['boys_clothing_size_in', 'boys_clothing_size_cm'],
  '61155': ['boys_clothing_size_in', 'boys_clothing_size_cm'],
  '61158': ['boys_clothing_size_in', 'boys_clothing_size_cm'],
  '61161': ['boys_clothing_size_in', 'boys_clothing_size_cm'],
  '61164': ['boys_clothing_size_in', 'boys_clothing_size_cm'],
  '61168': ['boys_clothing_size_in', 'boys_clothing_size_cm'],
  '61174001': ['boys_clothing_size_in', 'boys_clothing_size_cm'],
  '61174005': ['boys_clothing_size_in', 'boys_clothing_size_cm'],
  '61174007': ['boys_clothing_size_in', 'boys_clothing_size_cm'],
  '61174009': ['boys_clothing_size_in', 'boys_clothing_size_cm'],
  '61175': ['boys_clothing_size_in', 'boys_clothing_size_cm'],
  '62603121': ['boys_clothing_size_in', 'boys_clothing_size_cm'],
  // 女童装
  '61104': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  '61107': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  '61108': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  '61111': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  '61114': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  '61116': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  '61120': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  '61127': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  '61130': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  '61133': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  '61136': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  '61139': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  '61142': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  '61145': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  '61148': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  '61151': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  '61154': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  '61157': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  '61160': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  '61163': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  '61166': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  '61167': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  '61170': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  '61174003': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  '61174006': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  '61174008': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  '61174010': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  '61177': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  '62603122': ['girls_clothing_size_in', 'girls_clothing_size_cm'],
  // 男女童装
  '61103': ['boys_clothing_size_in', 'girls_clothing_size_in', 'boys_clothing_size_cm', 'girls_clothing_size_cm'],
  '61106': ['boys_clothing_size_in', 'girls_clothing_size_in', 'boys_clothing_size_cm', 'girls_clothing_size_cm'],
  '61110': ['boys_clothing_size_in', 'girls_clothing_size_in', 'boys_clothing_size_cm', 'girls_clothing_size_cm'],
  '61112': ['boys_clothing_size_in', 'girls_clothing_size_in', 'boys_clothing_size_cm', 'girls_clothing_size_cm'],
  '61119': ['boys_clothing_size_in', 'girls_clothing_size_in', 'boys_clothing_size_cm', 'girls_clothing_size_cm'],
  '61121': ['boys_clothing_size_in', 'girls_clothing_size_in', 'boys_clothing_size_cm', 'girls_clothing_size_cm'],
  '61126': ['boys_clothing_size_in', 'girls_clothing_size_in', 'boys_clothing_size_cm', 'girls_clothing_size_cm'],
  '61129': ['boys_clothing_size_in', 'girls_clothing_size_in', 'boys_clothing_size_cm', 'girls_clothing_size_cm'],
  '61132': ['boys_clothing_size_in', 'girls_clothing_size_in', 'boys_clothing_size_cm', 'girls_clothing_size_cm'],
  '61135': ['boys_clothing_size_in', 'girls_clothing_size_in', 'boys_clothing_size_cm', 'girls_clothing_size_cm'],
  '61138': ['boys_clothing_size_in', 'girls_clothing_size_in', 'boys_clothing_size_cm', 'girls_clothing_size_cm'],
  '61141': ['boys_clothing_size_in', 'girls_clothing_size_in', 'boys_clothing_size_cm', 'girls_clothing_size_cm'],
  '61144': ['boys_clothing_size_in', 'girls_clothing_size_in', 'boys_clothing_size_cm', 'girls_clothing_size_cm'],
  '61147': ['boys_clothing_size_in', 'girls_clothing_size_in', 'boys_clothing_size_cm', 'girls_clothing_size_cm'],
  '61150': ['boys_clothing_size_in', 'girls_clothing_size_in', 'boys_clothing_size_cm', 'girls_clothing_size_cm'],
  '61153': ['boys_clothing_size_in', 'girls_clothing_size_in', 'boys_clothing_size_cm', 'girls_clothing_size_cm'],
  '61156': ['boys_clothing_size_in', 'girls_clothing_size_in', 'boys_clothing_size_cm', 'girls_clothing_size_cm'],
  '61159': ['boys_clothing_size_in', 'girls_clothing_size_in', 'boys_clothing_size_cm', 'girls_clothing_size_cm'],
  '61162': ['boys_clothing_size_in', 'girls_clothing_size_in', 'boys_clothing_size_cm', 'girls_clothing_size_cm'],
  '61165': ['boys_clothing_size_in', 'girls_clothing_size_in', 'boys_clothing_size_cm', 'girls_clothing_size_cm'],
  '61169': ['boys_clothing_size_in', 'girls_clothing_size_in', 'boys_clothing_size_cm', 'girls_clothing_size_cm'],
  '61174002': ['boys_clothing_size_in', 'girls_clothing_size_in', 'boys_clothing_size_cm', 'girls_clothing_size_cm'],
  '61174004': ['boys_clothing_size_in', 'girls_clothing_size_in', 'boys_clothing_size_cm', 'girls_clothing_size_cm'],
  '61176': ['boys_clothing_size_in', 'girls_clothing_size_in', 'boys_clothing_size_cm', 'girls_clothing_size_cm'],
  '61178': ['boys_clothing_size_in', 'girls_clothing_size_in', 'boys_clothing_size_cm', 'girls_clothing_size_cm'],
  '61179': ['boys_clothing_size_in', 'girls_clothing_size_in', 'boys_clothing_size_cm', 'girls_clothing_size_cm'],
  // 亲子装
  '61117': ['boys_clothing_size_in', 'girls_clothing_size_in', 'men_clothing_size_in', 'women_clothing_size_in', 'boys_clothing_size_cm', 'girls_clothing_size_cm', 'men_clothing_size_cm', 'women_clothing_size_cm'],
  '62603114': ['boys_clothing_size_in', 'girls_clothing_size_in', 'men_clothing_size_in', 'women_clothing_size_in', 'boys_clothing_size_cm', 'girls_clothing_size_cm', 'men_clothing_size_cm', 'women_clothing_size_cm'],
  // 婴儿装
  '61101': ['baby_clothing_size_in', 'baby_clothing_size_cm'],
  '61124': ['baby_clothing_size_in', 'baby_clothing_size_cm'],
  // 孕妇装
  '61503018': ['gravida_clothing_size_tops_in', 'gravida_clothing_size_bottoms_in', 'gravida_clothing_size_tops_cm', 'gravida_clothing_size_bottoms_cm'],
  '61503019': ['gravida_clothing_size_tops_in', 'gravida_clothing_size_bottoms_in', 'gravida_clothing_size_tops_cm', 'gravida_clothing_size_bottoms_cm'],
  '61503020': ['gravida_clothing_size_tops_in', 'gravida_clothing_size_bottoms_in', 'gravida_clothing_size_tops_cm', 'gravida_clothing_size_bottoms_cm'],
  '61503021': ['gravida_clothing_size_tops_in', 'gravida_clothing_size_bottoms_in', 'gravida_clothing_size_tops_cm', 'gravida_clothing_size_bottoms_cm'],
  '61503022': ['gravida_clothing_size_tops_in', 'gravida_clothing_size_bottoms_in', 'gravida_clothing_size_tops_cm', 'gravida_clothing_size_bottoms_cm'],
  '61503024': ['gravida_clothing_size_tops_in', 'gravida_clothing_size_bottoms_in', 'gravida_clothing_size_tops_cm', 'gravida_clothing_size_bottoms_cm'],
  '61505041': ['gravida_clothing_size_tops_in', 'gravida_clothing_size_bottoms_in', 'gravida_clothing_size_tops_cm', 'gravida_clothing_size_bottoms_cm'],
  '61505047': ['gravida_clothing_size_tops_in', 'gravida_clothing_size_bottoms_in', 'gravida_clothing_size_tops_cm', 'gravida_clothing_size_bottoms_cm'],
  // 戒指
  '60212093': ['ring_size'],
  '60212099': ['ring_size'],
  '60212102': ['ring_size'],
  '60212106': ['ring_size'],
  '60212109': ['ring_size'],
  '60212113': ['ring_size'],
  '60212115': ['ring_size'],
  '60212119': ['ring_size'],
  '60212121': ['ring_size'],
  '60212125': ['ring_size'],
  '60212127': ['ring_size'],
  '60212131': ['ring_size'],
  '60212133': ['ring_size'],
  '60212137': ['ring_size'],
  '60212138': ['ring_size'],
  '60212141': ['ring_size'],
  '60212145': ['ring_size'],
  '60212146': ['ring_size'],
  '60212150': ['ring_size'],
  '60212152': ['ring_size'],
  '60215175': ['ring_size'],
  '60215176': ['ring_size'],
  '60215177': ['ring_size'],
  '60215178': ['ring_size'],
  '60215179': ['ring_size'],
  '60215180': ['ring_size'],
  '60221': ['ring_size'],
  // 鞋垫
  '60206055': ['men_shoes_size_in', 'women_shoes_size_in', 'men_shoes_size_cm', 'women_shoes_size_cm', 'kids_shoes_size'],
  '60206057': ['men_shoes_size_in', 'women_shoes_size_in', 'men_shoes_size_cm', 'women_shoes_size_cm', 'kids_shoes_size'],
  // 童鞋
  '61203025': ['kids_shoes_size'],
  '61203026': ['kids_shoes_size'],
  '61203027': ['kids_shoes_size'],
  '61203028': ['kids_shoes_size'],
  '61203029': ['kids_shoes_size'],
  '61203030': ['kids_shoes_size'],
  '61203031': ['kids_shoes_size'],
  '61203032': ['kids_shoes_size'],
  '61203033': ['kids_shoes_size'],
  '61203034': ['kids_shoes_size'],
  '61203035': ['kids_shoes_size'],
  '61203036': ['kids_shoes_size'],
  '61203037': ['kids_shoes_size'],
  '61203038': ['kids_shoes_size'],
  '61203039': ['kids_shoes_size'],
  '61203040': ['kids_shoes_size'],
  '61203041': ['kids_shoes_size'],
  '61203042': ['kids_shoes_size'],
  '61203043': ['kids_shoes_size'],
  '61203044': ['kids_shoes_size'],
  '61203045': ['kids_shoes_size'],
  '61203046': ['kids_shoes_size'],
  '61203047': ['kids_shoes_size'],
  '61203048': ['kids_shoes_size'],
  '61203049': ['kids_shoes_size'],
  '61203050': ['kids_shoes_size'],
  '61203051': ['kids_shoes_size'],
  '61203052': ['kids_shoes_size'],
  // 情侣鞋
  '61204055': ['men_shoes_size_in', 'women_shoes_size_in', 'men_shoes_size_cm', 'women_shoes_size_cm'],
  '61204059': ['men_shoes_size_in', 'women_shoes_size_in', 'men_shoes_size_cm', 'women_shoes_size_cm'],
  '61204062': ['men_shoes_size_in', 'women_shoes_size_in', 'men_shoes_size_cm', 'women_shoes_size_cm'],
  '61204065': ['men_shoes_size_in', 'women_shoes_size_in', 'men_shoes_size_cm', 'women_shoes_size_cm'],
  '62504019': ['men_shoes_size_in', 'women_shoes_size_in', 'men_shoes_size_cm', 'women_shoes_size_cm'],
  '62504020': ['men_shoes_size_in', 'women_shoes_size_in', 'men_shoes_size_cm', 'women_shoes_size_cm'],
  '62507047': ['men_shoes_size_in', 'women_shoes_size_in', 'men_shoes_size_cm', 'women_shoes_size_cm'],
  '62512069': ['men_shoes_size_in', 'women_shoes_size_in', 'men_shoes_size_cm', 'women_shoes_size_cm'],
  '62515086': ['men_shoes_size_in', 'women_shoes_size_in', 'men_shoes_size_cm', 'women_shoes_size_cm'],
  '62525164': ['men_shoes_size_in', 'women_shoes_size_in', 'men_shoes_size_cm', 'women_shoes_size_cm'],
  '62541263': ['men_shoes_size_in', 'women_shoes_size_in', 'men_shoes_size_cm', 'women_shoes_size_cm'],
  '62602080': ['men_shoes_size_in', 'women_shoes_size_in', 'men_shoes_size_cm', 'women_shoes_size_cm'],
  '62602081': ['men_shoes_size_in', 'women_shoes_size_in', 'men_shoes_size_cm', 'women_shoes_size_cm'],
  '62602085': ['men_shoes_size_in', 'women_shoes_size_in', 'men_shoes_size_cm', 'women_shoes_size_cm'],
  '62602176': ['men_shoes_size_in', 'women_shoes_size_in', 'men_shoes_size_cm', 'women_shoes_size_cm'],
  '62602177': ['men_shoes_size_in', 'women_shoes_size_in', 'men_shoes_size_cm', 'women_shoes_size_cm'],
  '62602178': ['men_shoes_size_in', 'women_shoes_size_in', 'men_shoes_size_cm', 'women_shoes_size_cm'],
  '62602179': ['men_shoes_size_in', 'women_shoes_size_in', 'men_shoes_size_cm', 'women_shoes_size_cm'],
  '62610180': ['men_shoes_size_in', 'women_shoes_size_in', 'men_shoes_size_cm', 'women_shoes_size_cm'],
  '62610182': ['men_shoes_size_in', 'women_shoes_size_in', 'men_shoes_size_cm', 'women_shoes_size_cm'],
  '62610183': ['men_shoes_size_in', 'women_shoes_size_in', 'men_shoes_size_cm', 'women_shoes_size_cm'],
  '62610184': ['men_shoes_size_in', 'women_shoes_size_in', 'men_shoes_size_cm', 'women_shoes_size_cm'],
  '62610185': ['men_shoes_size_in', 'women_shoes_size_in', 'men_shoes_size_cm', 'women_shoes_size_cm'],
  // 男鞋
  '61202013': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '61202014': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '61202015': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '61202016': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '61202017': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '61202018': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '61202019': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '61202020': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '61202021': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '61202022': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '61202023': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '61202024': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '61204053': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '61204056': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '61204060': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '61204063': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '62602075': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '62602078': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '62602083': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '62610087': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '62610090': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '62610093': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '62610096': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '62610099': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '62610102': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '62610105': ['men_shoes_size_in', 'men_shoes_size_cm'],
  '62610108': ['men_shoes_size_in', 'men_shoes_size_cm'],
  // 女鞋
  '61201001': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '61201002': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '61201057': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '61201003': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '61201004': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '61201005': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '61201006': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '61201007': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '61201008': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '61201009': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '61201010': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '61201011': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '61201012': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '61204054': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '61204058': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '61204061': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '61204064': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '62602076': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '62602079': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '62602084': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '62610088': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '62610091': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '62610094': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '62610097': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '62610100': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '62610103': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '62610106': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '62610109': ['women_shoes_size_in', 'women_shoes_size_cm'],
  '62610110': ['women_shoes_size_in', 'women_shoes_size_cm']
}

const getSizeChart = key => {
  let value = SIZE_CHART_MAP[key]
  if (value) {
    value['id'] = key
  }
  return value
}

const getSizeChartByCategoryId = categoryId => {
  let value = CATEGORY_ID_TO_SIZE_CHART[categoryId]
  return value || []
}

export default {
  getSizeChart,
  getSizeChartByCategoryId
}
