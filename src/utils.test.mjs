import assert from 'node:assert/strict';
import test from 'node:test';
import * as XLSX from 'xlsx';
import { buildExportGroups, parseUploadedSheet } from './utils.js';

const categoryCases = [
  { product: 'EV1K', expected: 'EV1' },
  { product: 'EV2K', expected: 'EV2' },
  { product: 'EV5K', expected: 'EV5' },
  { product: 'EV10K', expected: 'EV10' },
  { product: 'EV15K', expected: 'EV15' },
  { product: 'EV25K', expected: 'EV25' },
  { product: 'EV40K', expected: 'EV40' },
  { product: 'EV50K', expected: 'EV50' },
  { product: 'E100K', expected: 'EV1H' },
];

const getSheet = (rows) => {
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.aoa_to_sheet(rows);
  XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');
  return sheet;
};

for (const { product, expected } of categoryCases) {
  test(`parses structured spreadsheet rows for ${product}`, () => {
    const rows = [
      ['SerialNumber', 'PIN', 'Denomination', 'Currency', 'ExpiryDate', 'ProductSKU', 'State', 'OwnerId'],
      ['8039940073', '0406574103997', '1000 IQD', 'IQD', '2028-06-30T00:00:00', product, '3', '1547'],
    ];

    const { rows: parsedRows, pinLength } = parseUploadedSheet(getSheet(rows));
    assert.equal(parsedRows.length, 1, `expected 1 parsed row for ${product}`);
    assert.equal(pinLength, 13, `expected 13-digit PIN detection for ${product}`);
    assert.equal(parsedRows[0].split(',')[3], expected, `expected category ${expected} for ${product}`);
    assert.match(parsedRows[0].split(',')[0], /^\d{10,11}$/, `expected 10-11 digit serial for ${product}`);
    assert.ok(/^\d{13,15}$/.test(String(parsedRows[0].split(',')[1])), `expected PIN length 13-15 digits for ${product}`);
  });
}

test('parses the EV2K structured export shown in Excel', () => {
  const rows = [
    ['SerialNumber', 'PIN', 'Denomination', 'Currency', 'ExpiryDate', 'ProductSKU', 'State', 'OwnerId'],
    ['80399505000', '040780354444770', '2000', 'IQD', '2028-06-30T00:00:00', 'EV2K', '3', '1549'],
  ];

  const { rows: parsedRows, pinLength } = parseUploadedSheet(getSheet(rows));
  assert.equal(pinLength, 15);
  assert.deepEqual(parsedRows, ['80399505000,040780354444770,2028-06-30,EV2']);
});

test('parses serial-text rows for all supported category formats', () => {
  const rows = [
    ['Serial: 8039940071 Pin: 0406574103991 Expiry Date: 2028-06-30 EV2K'],
    ['Serial: 8039940073 Pin: 0406574103997 Expiry Date: 2028-06-30 E10K'],
    ['Serial: 8039940047 Pin: 040624581890046 Expiry Date: 2028-06-30 E50K'],
    ['Serial: 8039940075 Pin: 040680886908011 Expiry Date: 2028-06-30 EV25K'],
  ];

  const { rows: parsedRows } = parseUploadedSheet(getSheet(rows));
  assert.equal(parsedRows.length, 4, 'expected all 4 serial rows to be parsed');
  assert.deepEqual(
    parsedRows.map((entry) => entry.split(',')[3]).sort(),
    ['EV10', 'EV2', 'EV25', 'EV50'],
    'expected the supported categories to be mapped correctly'
  );
});

test('parses structured rows for additional app categories without a hardcoded whitelist', () => {
  const categoryRows = [
    ['8039940101', '0406574103101', '3000 IQD', 'IQD', '2028-06-30T00:00:00', 'EV3K', '3', '1547'],
    ['8039940106', '0406574103106', '6000 IQD', 'IQD', '2028-06-30T00:00:00', 'EV6K', '3', '1547'],
    ['8039940118', '0406574103118', '18000 IQD', 'IQD', '2028-06-30T00:00:00', 'EV18K', '3', '1547'],
    ['8039940135', '0406574103135', '35000 IQD', 'IQD', '2028-06-30T00:00:00', 'EV35K', '3', '1547'],
    ['8039940170', '0406574103170', '70000 IQD', 'IQD', '2028-06-30T00:00:00', 'EV70K', '3', '1547'],
    ['8039940200', '0406574103200', '200000 IQD', 'IQD', '2028-06-30T00:00:00', 'EV200K', '3', '1547'],
    ['8039940212', '0406574103212', '12000 IQD', 'IQD', '2028-06-30T00:00:00', 'EB12K', '3', '1547'],
    ['8039940225', '0406574103225', '25000 IQD', 'IQD', '2028-06-30T00:00:00', 'EB25K', '3', '1547'],
    ['8039940235', '0406574103235', '35000 IQD', 'IQD', '2028-06-30T00:00:00', 'EB35K', '3', '1547'],
    ['8039940255', '0406574103255', '55000 IQD', 'IQD', '2028-06-30T00:00:00', 'EB55K', '3', '1547'],
  ];
  const rows = [
    ['SerialNumber', 'PIN', 'Denomination', 'Currency', 'ExpiryDate', 'ProductSKU', 'State', 'OwnerId'],
    ...categoryRows,
  ];

  const { rows: parsedRows } = parseUploadedSheet(getSheet(rows));
  assert.deepEqual(
    parsedRows.map((entry) => entry.split(',')[3]).sort(),
    ['EB12', 'EB25', 'EB35', 'EB55', 'EV18', 'EV200', 'EV3', 'EV35', 'EV6', 'EV70']
  );
});

test('parses single-column content rows for all supported category formats', () => {
  const rows = [
    ['You have received one E100K voucher with details:- \nAmount: 100000.0 IQD\nSerial:10322702290\nPin: 000084520743243\n Expiry Date: 2028-06-30T00:00:00'],
    ['القسيمة الإلكترونية SN: 8039940047 PIN: 040624581890046 Expiry Date: 2028-06-30 EV5K'],
    ['القسيمة الإلكترونية SN: 8039940075 PIN: 040680886908011 Expiry Date: 2028-06-30 EV15K'],
  ];

  const { rows: parsedRows } = parseUploadedSheet(getSheet(rows));
  assert.equal(parsedRows.length, 3, 'expected all 3 single-column rows to be parsed');
  assert.deepEqual(
    parsedRows.map((entry) => entry.split(',')[3]).sort(),
    ['EV15', 'EV1H', 'EV5'],
    'expected the single-column content rows to map to the right categories'
  );
});

test('groups parsed documents by every returned category for display and export', () => {
  const groups = buildExportGroups([
    {
      sn: '80399505000',
      pin: '040780354444770',
      expirationDate: '2028-06-30',
      category: 'EV2',
      status: 'available',
      batch: 1549,
    },
    {
      sn: '8039940101',
      pin: '0406574103101',
      expirationDate: '2028-06-30',
      category: 'EV3',
      status: 'available',
      batch: 1549,
    },
    {
      sn: '80399505000',
      pin: '040780354444770',
      expirationDate: '2028-06-30',
      category: 'EV2',
      status: 'available',
      batch: 1549,
    },
  ]);

  assert.deepEqual(groups.map((group) => group[0].category), ['EV2', 'EV3']);
  assert.equal(groups[0].length, 2, 'expected duplicate serials to be removed from EV2 export group');
  assert.deepEqual(groups[0][1], {
    sn: '80399505000',
    pin: '040780354444770',
    status: 'available',
  });
});
