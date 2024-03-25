import { calculateAge } from '@/lib/utils';
import {
  Case as BaseCase,
  CrimeClassification,
  PersonalInformation,
} from '@prisma/client';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export type Case = BaseCase & {
  victim?: PersonalInformation;
  suspect?: PersonalInformation;
  classification?: CrimeClassification;
};

export function exportToExcel(cases: Case[]) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Cases');
  sheet.addRow([
    'RCI No.',
    'OB No.',
    'Victim',
    'Suspect',
    'Suspect Age',
    'Date of Occurrence',
    'Crime Classification',
    'Victim/Suspect Relationship',
  ]);
  const data = cases.map((it) => [
    it.rciNo,
    it.obNo,
    `${it?.victim?.firstName || ''} ${it?.victim?.surname || ''}`,
    `${it?.suspect?.firstName || ''} ${it?.suspect?.surname || ''}`,
    calculateAge(it?.suspect?.dateOfBirth),
    it.dateOfOccurrence,
    it?.classification?.name,
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
