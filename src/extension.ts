import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("🚀 A회사 개발표준 검사 Extension이 활성화되었습니다!");

  const lineCheckCommand = "codeStandard.checkLineLength";
  const lienCheckHandler = () => {
    const activeEditor = vscode.window.activeTextEditor;

    if (!activeEditor) {
      console.log("❌ 활성화된 에디터가 없습니다.");
      vscode.window.showWarningMessage("열린 파일이 없습니다.");
      return;
    }

    // 활성 에디터 정보 출력 (테스트)
    const document = activeEditor.document;
    const text = document.getText();

    // 텍스트를 라인별로 분할
    const lines = text.split("\n");

    // 설정값 읽기
    const config = vscode.workspace.getConfiguration("codeStandard");
    const maxLineLength = config.get<number>("maxLineLength", 120);
    console.log("📐 최대 라인 길이 설정값:", maxLineLength);

    lines.forEach((line, lineNumber) => {
      if (line.length > maxLineLength) {
        const message = `라인 ${lineNumber + 1}: ${
          line.length
        }자 초과 (최대: ${maxLineLength}자)`;
        console.log(`❌ ${message}`);
      } else {
        console.log(`✅ 라인 ${lineNumber + 1}: 길이 OK`);
      }
    });

    console.log("📏 라인 길이 검사 명령어가 실행되었습니다!");
    vscode.window.showInformationMessage(
      "테스트: 라인 길이 검사 명령어 실행됨"
    );
  };

  // 명령어 등록
  let checkLineLengthCommand = vscode.commands.registerCommand(
    lineCheckCommand,
    lienCheckHandler
  );

  context.subscriptions.push(checkLineLengthCommand);
}

export function deactivate() {
  console.log("👋 Extension이 비활성화되었습니다.");
}
