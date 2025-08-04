import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

interface Subject {
  name: string;
  teacher: string;
  grade: number | "N/A";
  comment: string;
}

interface Special {
  name: string;
  grade: number | "N/A";
  teacher: string;
}

interface WorkHabit {
  trait: string;
  rating: string;
}

interface ReportCardPDFProps {
  studentName: string;
  grade: string;
  term: string;
  academicYear: string;
  subjects: Subject[];
  specials: Special[];
  workHabits: WorkHabit[];
  generalComment: string;
  attendance: {
    totalDays: number;
    daysPresent: number;
    daysAbsent: number;
  };
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    borderBottom: 2,
    borderBottomColor: '#000',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
  },
  studentInfo: {
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 5,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 12,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor: '#e9ecef',
    padding: 8,
    borderRadius: 3,
  },
  subjectRow: {
    flexDirection: 'row',
    borderBottom: 1,
    borderBottomColor: '#dee2e6',
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  subjectName: {
    width: '25%',
    fontSize: 11,
    fontWeight: 'bold',
  },
  subjectTeacher: {
    width: '25%',
    fontSize: 10,
  },
  subjectGrade: {
    width: '15%',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subjectComment: {
    width: '35%',
    fontSize: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#6c757d',
    color: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  tableHeaderText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  specialsTable: {
    border: 1,
    borderColor: '#dee2e6',
    marginBottom: 10,
  },
  specialRow: {
    flexDirection: 'row',
    borderBottom: 1,
    borderBottomColor: '#dee2e6',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  workHabitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingVertical: 3,
  },
  workHabitTrait: {
    fontSize: 11,
    width: '70%',
  },
  workHabitRating: {
    fontSize: 11,
    fontWeight: 'bold',
    width: '30%',
    textAlign: 'right',
  },
  commentBox: {
    border: 1,
    borderColor: '#dee2e6',
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 3,
  },
  commentText: {
    fontSize: 11,
    lineHeight: 1.4,
  },
  attendanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 5,
  },
  attendanceItem: {
    alignItems: 'center',
  },
  attendanceNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  attendanceLabel: {
    fontSize: 10,
    color: '#6c757d',
  },
  gradingScale: {
    backgroundColor: '#e7f3ff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  gradingTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  gradingText: {
    fontSize: 10,
    marginBottom: 2,
  },
  signature: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureBox: {
    width: '45%',
    borderBottom: 1,
    borderBottomColor: '#000',
    paddingBottom: 20,
    alignItems: 'center',
  },
  signatureLabel: {
    fontSize: 10,
    marginTop: 5,
  },
});

export const ReportCardPDF = ({
  studentName,
  grade,
  term,
  academicYear,
  subjects,
  specials,
  workHabits,
  generalComment,
  attendance
}: ReportCardPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>AMERICAN UNIVERSITY OF NIGERIA</Text>
        <Text style={styles.subtitle}>PREPARATORY SCHOOL</Text>
        <Text style={styles.subtitle}>STUDENT REPORT CARD</Text>
      </View>

      {/* Student Information */}
      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>Student: {studentName}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Grade:</Text>
          <Text style={styles.infoValue}>{grade}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Term:</Text>
          <Text style={styles.infoValue}>{term}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Academic Year:</Text>
          <Text style={styles.infoValue}>{academicYear}</Text>
        </View>
      </View>

      {/* Academic Subjects */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ACADEMIC SUBJECTS</Text>
        
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { width: '25%' }]}>Subject</Text>
          <Text style={[styles.tableHeaderText, { width: '25%' }]}>Teacher</Text>
          <Text style={[styles.tableHeaderText, { width: '15%', textAlign: 'center' }]}>Grade</Text>
          <Text style={[styles.tableHeaderText, { width: '35%' }]}>Comment</Text>
        </View>

        {/* Subject Rows */}
        {subjects.map((subject, index) => (
          <View key={index} style={styles.subjectRow}>
            <Text style={styles.subjectName}>{subject.name}</Text>
            <Text style={styles.subjectTeacher}>{subject.teacher}</Text>
            <Text style={styles.subjectGrade}>{subject.grade}</Text>
            <Text style={styles.subjectComment}>{subject.comment}</Text>
          </View>
        ))}
      </View>

      {/* Special Subjects */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SPECIAL SUBJECTS</Text>
        <View style={styles.specialsTable}>
          {specials.map((special, index) => (
            <View key={index} style={styles.specialRow}>
              <Text style={[styles.subjectName, { width: '40%' }]}>{special.name}</Text>
              <Text style={[styles.subjectTeacher, { width: '40%' }]}>{special.teacher}</Text>
              <Text style={[styles.subjectGrade, { width: '20%' }]}>{special.grade}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Work Habits */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>WORK HABITS</Text>
        {workHabits.map((habit, index) => (
          <View key={index} style={styles.workHabitRow}>
            <Text style={styles.workHabitTrait}>{habit.trait}</Text>
            <Text style={styles.workHabitRating}>{habit.rating}</Text>
          </View>
        ))}
      </View>

      {/* Grading Scale */}
      <View style={styles.gradingScale}>
        <Text style={styles.gradingTitle}>GRADING SCALE</Text>
        <Text style={styles.gradingText}>A (90-100): Outstanding • B (80-89): Good • C (70-79): Satisfactory</Text>
        <Text style={styles.gradingText}>D (60-69): Needs Improvement • F (Below 60): Unsatisfactory</Text>
      </View>

      {/* General Comment */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>GENERAL COMMENT</Text>
        <View style={styles.commentBox}>
          <Text style={styles.commentText}>{generalComment}</Text>
        </View>
      </View>

      {/* Attendance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ATTENDANCE</Text>
        <View style={styles.attendanceGrid}>
          <View style={styles.attendanceItem}>
            <Text style={styles.attendanceNumber}>{attendance.totalDays}</Text>
            <Text style={styles.attendanceLabel}>Total Days</Text>
          </View>
          <View style={styles.attendanceItem}>
            <Text style={styles.attendanceNumber}>{attendance.daysPresent}</Text>
            <Text style={styles.attendanceLabel}>Days Present</Text>
          </View>
          <View style={styles.attendanceItem}>
            <Text style={styles.attendanceNumber}>{attendance.daysAbsent}</Text>
            <Text style={styles.attendanceLabel}>Days Absent</Text>
          </View>
        </View>
      </View>

      {/* Signatures */}
      <View style={styles.signature}>
        <View style={styles.signatureBox}>
          <Text style={styles.signatureLabel}>Class Teacher</Text>
        </View>
        <View style={styles.signatureBox}>
          <Text style={styles.signatureLabel}>Principal</Text>
        </View>
      </View>
    </Page>
  </Document>
);