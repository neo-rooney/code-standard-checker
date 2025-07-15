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

      console.log("✅ 활성 에디터 발견!");
      console.log("📄 파일 이름:", activeEditor.document.fileName);

      // 설정값 읽기
      const config = vscode.workspace.getConfiguration("codeStandard");
      const maxLineLength = config.get<number>("maxLineLength", 120);
      console.log("📐 최대 라인 길이 설정:", maxLineLength);

      // 단계 4: 문서 내용 분석 테스트
      console.log("📖 문서 내용 분석 시작...");

      const document = activeEditor.document;
      const text = document.getText();

      console.log("📝 전체 텍스트 길이:", text.length, "문자");
      console.log("📝 총 라인 수:", document.lineCount);

      // 텍스트를 라인별로 분할
      const lines = text.split("\n");
      console.log("📝 분할된 라인 수:", lines.length);

      // 각 라인 길이 검사
      let problemLines: string[] = [];
      let totalLines = 0;

      lines.forEach((line, lineNumber) => {
        totalLines++;
        console.log(`📏 라인 ${lineNumber + 1}: "${line}" (${line.length}자)`);

        if (line.length > maxLineLength) {
          const message = `라인 ${lineNumber + 1}: ${
            line.length
          }자 초과 (최대: ${maxLineLength}자)`;
          console.log(`❌ ${message}`);
          problemLines.push(message);
        } else {
          console.log(`✅ 라인 ${lineNumber + 1}: 길이 OK`);
        }
      });

      // 검사 결과 요약
      console.log("🔍 검사 완료!");
      console.log(
        `📊 총 ${totalLines}개 라인 중 ${problemLines.length}개 문제 발견`
      );

      // 결과 메시지 표시
      if (problemLines.length === 0) {
        vscode.window.showInformationMessage(
          `✅ 모든 라인이 길이 제한(${maxLineLength}자)을 준수합니다!`
        );
      } else {
        vscode.window.showWarningMessage(
          `⚠️ ${problemLines.length}개의 라인이 길이 제한을 초과합니다.`
        );
        console.log("❌ 문제가 발견된 라인들:");
        problemLines.forEach((line) => console.log(`   ${line}`));
      }
    }
  );

  context.subscriptions.push(checkLineLengthCommand);
}

export function deactivate() {
  console.log("👋 Extension이 비활성화되었습니다.");
}
