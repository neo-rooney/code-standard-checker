import * as vscode from "vscode";

let diagnosticCollection: vscode.DiagnosticCollection;

export function activate(context: vscode.ExtensionContext) {
  console.log("🚀 A회사 개발표준 검사 Extension이 활성화되었습니다!");

  // 단계 1: 진단 컬렉션 생성 및 테스트
  console.log("📋 진단 컬렉션 생성 중...");
  diagnosticCollection =
    vscode.languages.createDiagnosticCollection("codeStandard");
  context.subscriptions.push(diagnosticCollection);
  console.log("✅ 진단 컬렉션 생성 완료: codeStandard");

  // 기존 수동 검사 명령어 (이제 Diagnostic 사용)
  let checkLineLengthCommand = vscode.commands.registerCommand(
    "codeStandard.checkLineLength",
    () => {
      testDiagnosticCollection();
    }
  );

  context.subscriptions.push(checkLineLengthCommand);
}

// Diagnostic Collection 테스트 함수
function testDiagnosticCollection(): void {
  console.log("🧪 Diagnostic Collection 테스트 시작...");

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

  // 문서 분석 및 Diagnostic 생성
  const document = activeEditor.document;
  const diagnostics: vscode.Diagnostic[] = [];
  const text = document.getText();
  const lines = text.split("\n");

  console.log("🔍 라인별 분석 시작...");

  lines.forEach((line, lineNumber) => {
    console.log(`📏 라인 ${lineNumber + 1}: "${line}" (${line.length}자)`);

    if (line.length > maxLineLength) {
      // 문제가 있는 부분의 범위 지정 (초과 부분만)
      const range = new vscode.Range(
        new vscode.Position(lineNumber, maxLineLength),
        new vscode.Position(lineNumber, line.length)
      );

      // Diagnostic 객체 생성
      const diagnostic = new vscode.Diagnostic(
        range,
        `라인 길이가 ${maxLineLength}자를 초과합니다 (현재: ${line.length}자)`,
        vscode.DiagnosticSeverity.Warning
      );

      // 추가 메타데이터 설정
      diagnostic.source = "A회사 코딩표준";
      diagnostic.code = "line-length-exceeded";

      diagnostics.push(diagnostic);
      console.log(
        `⚠️  문제 발견! 라인 ${lineNumber + 1}: ${
          line.length
        }자 > ${maxLineLength}자`
      );
    } else {
      console.log(`✅ 라인 ${lineNumber + 1}: 길이 OK`);
    }
  });

  // DiagnosticCollection에 결과 설정
  console.log("📋 DiagnosticCollection에 결과 등록 중...");
  diagnosticCollection.set(document.uri, diagnostics);

  // 결과 요약
  console.log("🎯 Diagnostic Collection 테스트 완료!");
  console.log(
    `📊 총 ${lines.length}개 라인 중 ${diagnostics.length}개 문제 발견`
  );

  if (diagnostics.length === 0) {
    vscode.window.showInformationMessage(
      `✅ 모든 라인이 길이 제한(${maxLineLength}자)을 준수합니다!`
    );
  } else {
    vscode.window.showWarningMessage(
      `⚠️ ${diagnostics.length}개의 라인이 길이 제한을 초과합니다. Problems 패널을 확인하세요.`
    );
  }
}

export function deactivate() {
  console.log("👋 Extension이 비활성화되었습니다.");
  if (diagnosticCollection) {
    diagnosticCollection.dispose();
  }
}
