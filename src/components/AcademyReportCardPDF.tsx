import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

interface AcademySubject {
  name: string;
  ca1?: number;
  ca2?: number;
  ca3?: number;
  ca4?: number;
  exam?: number;
  total: number;
  grade: string;
  position?: number;
  remark: string;
  teachersAverage?: number;
}

interface AcademyReportCardPDFProps {
  studentId: string;
  studentName: string;
  class: string;
  academicYear: string;
  positionInClass?: number;
  noInClass?: number;
  term: string;
  totalSubjects: number;
  subjects: AcademySubject[];
  cumulativeScore?: number;
  cutOffAverage?: number;
  studentsAverage?: number;
  personalTutorComment: string;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 9,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
    borderBottomColor: '#000',
    paddingBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  headerText: {
    flex: 1,
    alignItems: 'center',
  },
  schoolName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  schoolAddress: {
    fontSize: 10,
    marginBottom: 5,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  studentInfo: {
    marginBottom: 15,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderTopStyle: 'solid',
    borderBottomStyle: 'solid',
    borderTopColor: '#000',
    borderBottomColor: '#000',
    paddingVertical: 8,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoItem: {
    flexDirection: 'row',
    width: '33.33%',
    marginBottom: 3,
    paddingHorizontal: 2,
  },
  infoLabel: {
    fontSize: 9,
    color: '#DC2626',
    minWidth: 80,
  },
  infoValue: {
    fontSize: 9,
    marginLeft: 5,
  },
  tableContainer: {
    marginBottom: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1E3A8A',
    paddingVertical: 8,
    paddingHorizontal: 2,
  },
  tableHeaderText: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 1,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 2,
    minHeight: 20,
  },
  cellText: {
    fontSize: 8,
    paddingHorizontal: 1,
    textAlign: 'center',
  },
  cellTextLeft: {
    fontSize: 8,
    paddingHorizontal: 1,
    textAlign: 'left',
  },
  subjectName: {
    width: '15%',
  },
  ca: {
    width: '8%',
  },
  exam: {
    width: '8%',
  },
  total: {
    width: '10%',
  },
  grade: {
    width: '8%',
  },
  position: {
    width: '8%',
  },
  remark: {
    width: '20%',
  },
  average: {
    width: '10%',
  },
  summarySection: {
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  summaryValue: {
    fontSize: 10,
    marginLeft: 10,
  },
  gradeDescriptors: {
    marginBottom: 15,
  },
  gradeHeader: {
    backgroundColor: '#1E3A8A',
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
    paddingVertical: 6,
  },
  gradeTable: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000',
  },
  gradeRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#000',
    paddingVertical: 3,
    paddingHorizontal: 2,
  },
  gradeCell: {
    fontSize: 8,
    paddingHorizontal: 2,
  },
  commentSection: {
    marginBottom: 15,
  },
  commentTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  commentText: {
    fontSize: 10,
    lineHeight: 1.4,
    paddingHorizontal: 10,
  },
  signatureSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  signatureImage: {
    width: 60,
    height: 20,
    marginBottom: 5,
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: '#000',
    width: 150,
    paddingTop: 3,
    alignItems: 'center',
  },
  signatureName: {
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signatureTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export const AcademyReportCardPDF = ({
  studentId,
  studentName,
  class: studentClass,
  academicYear,
  positionInClass,
  noInClass,
  term,
  totalSubjects,
  subjects,
  cumulativeScore,
  cutOffAverage,
  studentsAverage,
  personalTutorComment,
}: AcademyReportCardPDFProps) => {
  // Filter subjects to only show those with actual data
  const studentSubjects = subjects.filter(subject => 
    subject && (subject.total > 0 || subject.ca1 || subject.ca2 || subject.ca3 || subject.ca4 || subject.exam)
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.schoolName}>American University of Nigeria Schools – Academy</Text>
            <Text style={styles.schoolAddress}>No. 99, Lamido Zubairu Way, Yola Bye – Pass, P.M.B. 2250</Text>
            <Text style={styles.reportTitle}>STUDENT REPORT CARD</Text>
          </View>
        </View>

        {/* Student Information */}
        <View style={styles.studentInfo}>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Student's ID:</Text>
              <Text style={styles.infoValue}>{studentId}</Text>
            </View>
            <View style={[styles.infoItem, { width: '66.66%' }]}>
              <Text style={styles.infoLabel}>Student's Name:</Text>
              <Text style={styles.infoValue}>{studentName}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Class:</Text>
              <Text style={styles.infoValue}>{studentClass}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Academic Year:</Text>
              <Text style={styles.infoValue}>{academicYear}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Term:</Text>
              <Text style={styles.infoValue}>{term}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Position in Class:</Text>
              <Text style={styles.infoValue}>{positionInClass}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>No. in Class:</Text>
              <Text style={styles.infoValue}>{noInClass}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Total Subject:</Text>
              <Text style={styles.infoValue}>{totalSubjects}</Text>
            </View>
          </View>
        </View>

        {/* Subjects Table */}
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.subjectName]}>Subject Name</Text>
            <Text style={[styles.tableHeaderText, styles.ca]}>CA1</Text>
            <Text style={[styles.tableHeaderText, styles.ca]}>CA2</Text>
            <Text style={[styles.tableHeaderText, styles.ca]}>CA3</Text>
            <Text style={[styles.tableHeaderText, styles.ca]}>CA4</Text>
            <Text style={[styles.tableHeaderText, styles.exam]}>Exam</Text>
            <Text style={[styles.tableHeaderText, styles.total]}>Total Score</Text>
            <Text style={[styles.tableHeaderText, styles.grade]}>Grade</Text>
            <Text style={[styles.tableHeaderText, styles.position]}>Position</Text>
            <Text style={[styles.tableHeaderText, styles.remark]}>Remark</Text>
            <Text style={[styles.tableHeaderText, styles.average]}>CSS Average</Text>
          </View>

          {/* Table Rows */}
          {studentSubjects.map((subject, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.cellTextLeft, styles.subjectName]}>{subject.name}</Text>
              <Text style={[styles.cellText, styles.ca]}>{subject.ca1 || ''}</Text>
              <Text style={[styles.cellText, styles.ca]}>{subject.ca2 || ''}</Text>
              <Text style={[styles.cellText, styles.ca]}>{subject.ca3 || ''}</Text>
              <Text style={[styles.cellText, styles.ca]}>{subject.ca4 || ''}</Text>
              <Text style={[styles.cellText, styles.exam]}>{subject.exam || ''}</Text>
              <Text style={[styles.cellText, styles.total]}>{subject.total || ''}</Text>
              <Text style={[styles.cellText, styles.grade]}>{subject.grade || ''}</Text>
              <Text style={[styles.cellText, styles.position]}>{subject.position || ''}</Text>
              <Text style={[styles.cellTextLeft, styles.remark]}>{subject.remark || ''}</Text>
              <Text style={[styles.cellText, styles.average]}>{subject.teachersAverage || ''}</Text>
            </View>
          ))}
        </View>

        {/* Summary */}
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Cumulative Score: <Text style={styles.summaryValue}>{cumulativeScore?.toFixed(2) || 0}</Text></Text>
            <Text style={styles.summaryLabel}>Cut-Off Average: <Text style={styles.summaryValue}>{cutOffAverage || 50}</Text></Text>
            <Text style={styles.summaryLabel}>Student's Average: <Text style={styles.summaryValue}>{studentsAverage?.toFixed(2) || 0}</Text></Text>
          </View>
        </View>

        {/* Grade Descriptors */}
        <View style={styles.gradeDescriptors}>
          <Text style={styles.gradeHeader}>GRADE DESCRIPTORS</Text>
          <View style={styles.gradeTable}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, { width: '30%' }]}>% Score</Text>
              <Text style={[styles.tableHeaderText, { width: '20%' }]}>Grade</Text>
              <Text style={[styles.tableHeaderText, { width: '50%' }]}>Descriptor</Text>
            </View>
            {[
              ['91.00 - 100.00', 'A1', 'Excellent'],
              ['81.00 - 90.00', 'B2', 'Very Good'],
              ['71.00 - 80.00', 'B3', 'Good'],
              ['65.00 - 70.00', 'C4', 'Credit'],
              ['60.00 - 64.00', 'C5', 'Credit'],
              ['50.00 - 59.00', 'C6', 'Credit'],
              ['45.00 - 49.00', 'D7', 'Pass'],
              ['40.00 - 44.00', 'E8', 'Pass'],
              ['0.00 - 39.00', 'F9', 'Fail']
            ].map((grade, index) => (
              <View key={index} style={styles.gradeRow}>
                <Text style={[styles.gradeCell, { width: '30%' }]}>{grade[0]}</Text>
                <Text style={[styles.gradeCell, { width: '20%', textAlign: 'center' }]}>{grade[1]}</Text>
                <Text style={[styles.gradeCell, { width: '50%', textAlign: 'center' }]}>{grade[2]}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Personal Tutor Comment */}
        <View style={styles.commentSection}>
          <Text style={styles.commentTitle}>PERSONAL TUTOR'S COMMENT</Text>
          <Text style={styles.commentText}>{personalTutorComment}</Text>
        </View>

        {/* Signature */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureLine}>
            <Text style={styles.signatureName}>N. Y. Mikail</Text>
            <Text style={styles.signatureTitle}>Asst. Director Academics</Text>
            <Text style={styles.signatureTitle}>AUN Schools</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};