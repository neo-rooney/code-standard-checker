import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("🚀 A회사 개발표준 검사 Extension이 활성화되었습니다!");

  // 단계 1: 가장 기본적인 명령어 등록 (테스트용)
  let checkLineLengthCommand = vscode.commands.registerCommand(
    "codeStandard.checkLineLength",
    () => {
      console.log("📏 라인 길이 검사 명령어가 실행되었습니다!");
      vscode.window.showInformationMessage(
        "테스트: 라인 길이 검사 명령어 실행됨"
      );
    }
  );

  context.subscriptions.push(checkLineLengthCommand);
}

export function deactivate() {
  console.log("👋 Extension이 비활성화되었습니다.");
}
