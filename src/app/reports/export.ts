import { dateTime } from '@/lib/format';
import { calculateAge } from '@/lib/utils';
import {
  Case as BaseCase,
  CrimeClassification,
  PersonalInformation,
} from '@prisma/client';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export type Case = BaseCase & {
  victims?: PersonalInformation[];
  suspects?: PersonalInformation[];
  crimeClassifications?: CrimeClassification[];
};

export function exportToExcel(cases: Case[]) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Cases');
  addHeader(sheet, 'Cases Report');
  sheet.addRow([
    'RCI No.',
    'OB No.',
    'Victim',
    'Suspect',
    'Date of Occurrence',
    'Crime Classification',
    'Victim/Suspect Relationship',
  ]);

  const row = sheet.lastRow;
  row?.eachCell((cell) => {
    cell.font = { bold: true };
    cell.border = { bottom: { style: 'medium' }, top: { style: 'medium' } };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' },
    };
    const col = sheet.getColumn(cell.col);
    col.width = Math.max(15, cell?.value?.toString().length ?? 0 + 2);
    row.alignment = { vertical: 'middle' };
    row.height = 30;
  });

  const data = cases.map((it) => [
    it.rciNo,
    it.obNo,
    it.victims
      ?.map(
        (v) => `${v.firstName} ${v.surname} (${calculateAge(v.dateOfBirth)})`
      )
      .join(', '),
    it.suspects
      ?.map(
        (v) => `${v.firstName} ${v.surname} (${calculateAge(v.dateOfBirth)})`
      )
      .join(', '),
    dateTime(it.dateOfOccurrence),
    it.crimeClassifications?.map((c) => c.name).join(', '),
    it.suspectVictimRelationship,
  ]);

  data.forEach((row) => sheet.addRow(row));

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, 'Report.xlsx');
  });
}

function addHeader(sheet: ExcelJS.Worksheet, title: string) {
  sheet.addRow([title]);
  sheet.mergeCells('A1:G1');
  const row = sheet.getRow(1);
  row.height = 150;
  row.alignment = { vertical: 'middle', horizontal: 'center' };
  row.font = { size: 20, bold: true };
  // add border to the header left and right
  row.eachCell((cell) => {
    cell.border = { left: { style: 'medium' }, right: { style: 'dotted' } };
  });
}
