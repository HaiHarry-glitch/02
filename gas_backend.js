// ==========================================
// 1. PHẦN SETUP SHEET TRỰC TIẾP TỪ CODE (CHẠY 1 LẦN)
// ==========================================
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Định nghĩa các trang tính và tiêu đề cột khớp với logic Markdown
  const sheetsDef = {
    'Users': ['Họ Tên', 'Email', 'Lớp'], // Tab user theo hình ảnh
    'Exercises': ['id', 'title', 'topic', 'difficulty', 'description', 'source', 'num_paras'],
    'Paragraphs': ['exercise_id', 'para_id', 'text', 'simplify_hint', 'connect_main_sentence', 'connect_insight', 'summarise_good', 'summarise_bad', 'summarise_why_bad'],
    'Headings': ['exercise_id', 'heading_id', 'text', 'correct_para', 'distractor_type', 'explanation'],
    'Sentences': ['exercise_id', 'para_id', 'sentence_idx', 'core', 'role', 'role_label', 'explanation'],
    'Submissions': ['timestamp', 'email', 'studentName', 'className', 'studentId', 'assignmentId', 'lessonId', 'lessonTitle', 'stage2Score', 'stage3Score', 'timeSpentStr', 'usedApiKey', 'detailsStage2', 'detailsStage3']
  };

  // Vòng lặp tự gen các Tab sheet
  for (const [sheetName, headers] of Object.entries(sheetsDef)) {
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }
    
    // Clear dữ liệu dòng 1 rồi đánh dấu Headers
    sheet.getRange(1, 1, 1, sheet.getLastColumn() || 1).clearContent();
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format Design Header
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#FDE68A'); // Màu vàng highlight
    headerRange.setBorder(true, true, true, true, false, false);
    
    // Freeze Row 1 
    sheet.setFrozenRows(1);
  }
  
  // Xóa Sheet1 thừa nếu có
  const defaultSheet = ss.getSheetByName('Trang tính 1') || ss.getSheetByName('Sheet1');
  if (defaultSheet && defaultSheet.getLastRow() === 0 && ss.getSheets().length > 1) {
    ss.deleteSheet(defaultSheet);
  }

  Logger.log("Đã tạo bảng biểu dữ liệu thành công");
}


// ==========================================
// 2. HELPER CHUYỂN ĐỔI CHUỖI VÀ OBJECT
// ==========================================
function sheetDataToObjectArray(data) {
  if (!data || data.length < 2) return [];
  const headers = data[0];
  const rows = data.slice(1);
  
  return rows.map(row => {
    let obj = {};
    headers.forEach((header, index) => obj[header] = row[index]);
    return obj;
  });
}

// ==========================================
// 3. XỬ LÝ GET REQUEST (LẤY DỮ LIỆU APP)
// ==========================================
function doGet(e) {
  const action = e.parameter.action;
  let response = { ok: false, message: "Action handler not found" };

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Hành động 0: Tìm tra cứu email
    if (action === 'lookupEmail') {
      const emailQuery = (e.parameter.email || '').toString().toLowerCase().trim();
      let foundStudent = null;

      const usersSheet = ss.getSheetByName('Users');
      if (usersSheet) {
        const data = usersSheet.getDataRange().getValues();
        // Bỏ qua dòng tiêu đề
        for (let i = 1; i < data.length; i++) {
          const row = data[i];
          let matched = false;
          let emailColIdx = -1;
          
          // Đi tìm email trong mọi cột
          for (let j = 0; j < row.length; j++) {
            if (row[j].toString().toLowerCase().trim() === emailQuery) {
              matched = true;
              emailColIdx = j;
              break;
            }
          }
          
          if (matched) {
            // Giả định từ hình ảnh: A(0): Tên, B(1): Email, C(2): Lớp
            let name = row[0] ? row[0].toString().trim() : '';
            let className = row[2] ? row[2].toString().trim() : '';

            // Dự phòng nếu header ngược: A(0) là Email, B(1) là tên 
            if (emailColIdx === 0) {
              name = row[1] ? row[1].toString().trim() : '';
              className = row[2] ? row[2].toString().trim() : '';
            }

            foundStudent = {
              name: name,
              class: className,
              email: emailQuery
            };
            break;
          }
        }
      }

      if (foundStudent) {
        response = { ok: true, name: foundStudent.name, class: foundStudent.class, email: foundStudent.email };
      } else {
        response = { ok: false, error: "Không tìm thấy học sinh" };
      }

    // Hành động 1: Load danh sách bài tập vào Trang Menu
    } else if (action === 'listExercises') {
      const sheet = ss.getSheetByName('Exercises');
      const data = sheet.getDataRange().getValues();
      const exercises = sheetDataToObjectArray(data);
      response = { ok: true, exercises: exercises };

    // Hành động 2: Lấy Full API Bài luyện tập cụ thể theo ExId
    } else if (action === 'getExercise') {
      const exId = e.parameter.ex;
      if (!exId) throw new Error("Yêu cầu cung cấp tham số 'ex'");

      const exercises = sheetDataToObjectArray(ss.getSheetByName('Exercises').getDataRange().getValues());
      const paras = sheetDataToObjectArray(ss.getSheetByName('Paragraphs').getDataRange().getValues());
      const headings = sheetDataToObjectArray(ss.getSheetByName('Headings').getDataRange().getValues());
      const sentences = sheetDataToObjectArray(ss.getSheetByName('Sentences').getDataRange().getValues());

      const meta = exercises.find(ex => String(ex.id) === String(exId));
      
      if (!meta) {
        response = { ok: false, error: "Không tìm thấy Bài tập mã: " + exId };
      } else {
        response = { 
          ok: true, 
          exercise: {
            id: exId,
            meta: meta,
            paragraphs: paras.filter(p => String(p.exercise_id) === String(exId)),
            headings: headings.filter(h => String(h.exercise_id) === String(exId)),
            sentences: sentences.filter(s => String(s.exercise_id) === String(exId))
          }
        };
      }
    }
  } catch (error) {
    response = { ok: false, error: error.toString() };
  }

  // Handle CORS gracefully
  const output = ContentService.createTextOutput(JSON.stringify(response));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

// ==========================================
// 4. XỬ LÝ POST REQUEST (NỘP BÀI GHI KẾT QUẢ VÀO SHEET)
// ==========================================
function doPost(e) {
  // Config `text/plain` bypass CORS ở integrationService
  try {
    if (!e.postData || !e.postData.contents) throw new Error("Dữ liệu nộp trống");
    
    const payload = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetSubmit = ss.getSheetByName('Submissions');

    // Chèn dữ liệu theo đúng Headers đã khai báo ['timestamp', 'studentName', 'className', 'studentId', 'assignmentId', 'lessonId', 'lessonTitle', 'stage2Score', 'stage3Score', 'timeSpentStr', 'detailsStage2', 'detailsStage3']
    sheetSubmit.appendRow([
      payload.timestamp || new Date().toISOString(),
      payload.email || 'N/A',
      payload.studentName || 'N/A',
      payload.className || 'N/A',
      payload.studentId || 'N/A',
      payload.assignmentId || 'N/A',
      payload.lessonId || 'N/A',
      payload.lessonTitle || 'N/A',
      payload.stage2Score || 0,
      payload.stage3Score || 0,
      payload.timeSpentStr || '0:00',
      payload.usedApiKey || 'N/A',
      payload.detailsStage2 || '',
      payload.detailsStage3 || ''
    ]);

    const output = ContentService.createTextOutput(JSON.stringify({
      ok: true,
      message: "Hoàn tất ghi phiếu trả lời"
    }));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;

  } catch (error) {
    const output = ContentService.createTextOutput(JSON.stringify({
      ok: false,
      error: error.toString()
    }));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  }
}
