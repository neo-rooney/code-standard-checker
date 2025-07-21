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
    console.log("✅ 활성 에디터 발견!");
    const document = activeEditor.document;
    const text = document.getText();

    console.log("📝 전체 텍스트 길이:", text.length, "문자");

    const lines = text.split("\n");
    console.log("📝 분할된 라인 수:", lines.length);

    lines.forEach((line, lineNumber) => {
      console.log(`📏 라인 ${lineNumber + 1}: "${line}" (${line.length}자)`);
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
