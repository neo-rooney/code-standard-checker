import * as vscode from "vscode";

let diagnosticCollection: vscode.DiagnosticCollection;

export function activate(context: vscode.ExtensionContext) {
  console.log("🚀 코드 품질 가디언 Extension이 활성화되었습니다!");

  // 진단 컬렉션 생성
  diagnosticCollection =
    vscode.languages.createDiagnosticCollection("codeQuality");
  context.subscriptions.push(diagnosticCollection);

  // 즉시 검사 시작
  const activeEditor = vscode.window.activeTextEditor;
  if (activeEditor) {
    console.log("📂 Extension 활성화 시 열린 파일 발견, 즉시 검사 시작");
    performRealTimeCheck(activeEditor.document);
  }

  // 텍스트 변경 시 실시간 검사
  const textChangeSubscription = vscode.workspace.onDidChangeTextDocument(
    (event) => {
      console.log("📝 텍스트 변경 감지됨");
      performRealTimeCheck(event.document);
    }
  );

  // 파일 열기 시 초기 검사
  const fileOpenSubscription = vscode.window.onDidChangeActiveTextEditor(
    (editor) => {
      if (editor) {
        console.log("📂 새 파일이 열렸습니다");
        performRealTimeCheck(editor.document);
      }
    }
  );

  // 설정 변경 감지
  const configChangeSubscription = vscode.workspace.onDidChangeConfiguration(
    (event) => {
      if (event.affectsConfiguration("codeStandard")) {
        console.log("⚙️ 설정이 변경되었습니다");
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
          performRealTimeCheck(activeEditor.document);
        }
      }
    }
  );

  context.subscriptions.push(
    textChangeSubscription,
    fileOpenSubscription,
    configChangeSubscription
  );
}

function performRealTimeCheck(document: vscode.TextDocument): void {
  // 설정값 읽기
  const config = vscode.workspace.getConfiguration("codeStandard");
  const maxLineLength = config.get<number>("maxLineLength", 120);

  const diagnostics: vscode.Diagnostic[] = [];
  const text = document.getText();
  const lines = text.split("\n");

  lines.forEach((line, lineNumber) => {
    if (line.length > maxLineLength) {
      // 문제가 있는 라인의 범위 지정
      const range = new vscode.Range(
        lineNumber, // 시작 라인
        maxLineLength, // 위반 지점부터 시작
        lineNumber, // 끝 라인
        line.length // 라인 끝까지
      );

      // 진단 메시지 생성
      const message = `라인 길이 ${line.length}자가 최대 허용 길이 ${maxLineLength}자를 초과했습니다.`;

      // Diagnostic 객체 생성
      const diagnostic = new vscode.Diagnostic(
        range,
        message,
        vscode.DiagnosticSeverity.Warning
      );

      diagnostics.push(diagnostic);
      console.log(
        `⚠️ 라인 ${lineNumber + 1}: ${line.length}자 (최대: ${maxLineLength}자)`
      );
    }
  });

  // DiagnosticCollection에 결과 적용
  diagnosticCollection.set(document.uri, diagnostics);
  console.log(`🔍 총 ${diagnostics.length}개의 라인 길이 위반 발견`);
}
