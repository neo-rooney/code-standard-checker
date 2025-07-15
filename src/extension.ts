import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("🚀 A회사 개발표준 검사 Extension이 활성화되었습니다!");

  let checkLineLengthCommand = vscode.commands.registerCommand(
    "codeStandard.checkLineLength",
    () => {
      console.log("📏 라인 길이 검사 명령어가 실행되었습니다!");

      // 단계 2: 현재 활성화된 에디터 가져오기 테스트
      const activeEditor = vscode.window.activeTextEditor;

      if (!activeEditor) {
        console.log("❌ 활성화된 에디터가 없습니다.");
        vscode.window.showWarningMessage("열린 파일이 없습니다.");
        return;
      }

      // 활성 에디터 정보 출력 (테스트)
      console.log("✅ 활성 에디터 발견!");
      console.log("📄 파일 이름:", activeEditor.document.fileName);
      console.log("🔤 언어 ID:", activeEditor.document.languageId);
      console.log("📝 총 라인 수:", activeEditor.document.lineCount);

      vscode.window.showInformationMessage(
        `파일 분석 완료: ${activeEditor.document.fileName}`
      );
    }
  );

  context.subscriptions.push(checkLineLengthCommand);
}

export function deactivate() {
  console.log("👋 Extension이 비활성화되었습니다.");
}
