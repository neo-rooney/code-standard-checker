import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("🚀 A회사 개발표준 검사 Extension이 활성화되었습니다!");

  let checkLineLengthCommand = vscode.commands.registerCommand(
    "codeStandard.checkLineLength",
    () => {
      console.log("📏 라인 길이 검사 명령어가 실행되었습니다!");

      const activeEditor = vscode.window.activeTextEditor;

      if (!activeEditor) {
        console.log("❌ 활성화된 에디터가 없습니다.");
        vscode.window.showWarningMessage("열린 파일이 없습니다.");
        return;
      }

      // 활성 에디터 정보 출력
      console.log("✅ 활성 에디터 발견!");
      console.log("📄 파일 이름:", activeEditor.document.fileName);
      console.log("🔤 언어 ID:", activeEditor.document.languageId);

      // 단계 3: 설정값 읽기 테스트
      console.log("⚙️  설정값 읽기 테스트 시작...");

      const config = vscode.workspace.getConfiguration("codeStandard");
      const maxLineLength = config.get<number>("maxLineLength");

      console.log("📐 설정에서 읽은 최대 라인 길이:", maxLineLength);
      console.log(
        "📐 기본값 적용된 최대 라인 길이:",
        config.get<number>("maxLineLength", 120)
      );

      // 설정값이 올바르게 읽혔는지 확인
      if (maxLineLength !== undefined) {
        console.log("✅ 설정값 읽기 성공!");
        vscode.window.showInformationMessage(
          `설정 확인: 최대 라인 길이 = ${maxLineLength}자`
        );
      } else {
        console.log("❌ 설정값 읽기 실패 - undefined 반환");
        vscode.window.showWarningMessage("설정값을 읽을 수 없습니다.");
      }
    }
  );

  context.subscriptions.push(checkLineLengthCommand);
}

export function deactivate() {
  console.log("👋 Extension이 비활성화되었습니다.");
}
