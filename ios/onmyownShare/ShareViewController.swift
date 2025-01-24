//
//  ShareViewController.swift
//  onmyownShare
//
//  Created by jejemerong on 1/17/25.
//
import UIKit
import Social

class ShareViewController: UIViewController {
    let textView = UITextView()

    override func viewDidLoad() {
        super.viewDidLoad()
        
        // UI 설정
        textView.frame = self.view.bounds
        textView.font = UIFont.systemFont(ofSize: 16)
        textView.contentInset = UIEdgeInsets(top: 100, left: 20, bottom: 20, right: 20) // 여백 추가
        self.view.addSubview(textView)
        
        let imageView = UIImageView()
        imageView.frame = CGRect(x: (self.view.frame.width - 100) / 2, y: 80, width: 100, height: 100)
        imageView.contentMode = .scaleAspectFit
        imageView.image = UIImage(named: "myduck") // 이미지 이름에 맞게 변경
        self.view.addSubview(imageView)
        
        // 네비게이션 바 추가
        let navigationBar = UINavigationBar(frame: CGRect(x: 0, y: 0, width: self.view.frame.size.width, height: 56))
        let navigationItem = UINavigationItem(title: "루틴 공유하기")
        navigationItem.rightBarButtonItem = {
            let button = UIBarButtonItem(barButtonSystemItem: .save, target: self, action: #selector(saveButtonTapped))
            button.tintColor = UIColor(red: 1.0, green: 202/255.0, blue: 90/255.0, alpha: 1.0)
            return button
        }()
        navigationItem.leftBarButtonItem = {
            let button = UIBarButtonItem(barButtonSystemItem: .cancel, target: self, action: #selector(cancel))
            button.tintColor = UIColor(red: 1.0, green: 202/255.0, blue: 90/255.0, alpha: 1.0)
            return button
        }()
        navigationBar.setItems([navigationItem], animated: false)
        self.view.addSubview(navigationBar)
        
        // extensionContext를 통해 공유 데이터 처리
        handleIncomingContent()
    }

    func handleIncomingContent() {
        // 공유된 항목 가져오기
        guard let extensionItems = self.extensionContext?.inputItems as? [NSExtensionItem] else { return }
        
        for item in extensionItems {
            if let attachments = item.attachments {
                for provider in attachments {
                    if provider.hasItemConformingToTypeIdentifier("public.plain-text") {
                        provider.loadItem(forTypeIdentifier: "public.plain-text", options: nil) { [weak self] (text, error) in
                            if let sharedText = text as? String {
                                DispatchQueue.main.async {
                                    self?.textView.text = sharedText
                                }
                            }
                        }
                    } else if provider.hasItemConformingToTypeIdentifier("public.url") {
                        provider.loadItem(forTypeIdentifier: "public.url", options: nil) { [weak self] (url, error) in
                            if let sharedURL = url as? URL {
                                DispatchQueue.main.async {
                                    self?.textView.text = sharedURL.absoluteString
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    @objc func saveButtonTapped() {
        // 입력된 텍스트 처리
        let text = textView.text ?? ""

        // 데이터가 비어있지 않은지 확인
        guard !text.isEmpty else {
            print("저장할 텍스트가 비어 있습니다.")
            return
        }

        // 데이터를 UserDefaults에 저장
        let userDefaults = UserDefaults.standard
        print("UserDefaults 접근 성공")
        
        // UserDefaults에 데이터 저장
        do {
            userDefaults.set(text, forKey: "shared_text") // UserDefaults를 사용하여 데이터 저장
            print("데이터가 성공적으로 저장되었습니다.")
        } catch {
            print("데이터 저장 중 오류 발생: \(error.localizedDescription)")
        }
        
        // 저장된 데이터 확인
        if let savedText = userDefaults.string(forKey: "shared_text") {
            print("저장된 값: \(savedText)")
        } else {
            print("저장된 값이 없습니다.")
        }
        
        // Extension 종료 후 메인 앱으로 이동
        self.extensionContext?.completeRequest(returningItems: nil) { _ in
            let url = URL(string: "onmyown://")!
            _ = self.openURL(url)
        }
    }
    
    @objc func cancel() {
        self.extensionContext?.completeRequest(returningItems: nil, completionHandler: nil)
    }

    // URL을 여는 헬퍼 메서드
    func openURL(_ url: URL) -> Bool {
        var responder: UIResponder? = self
        while responder != nil {
            if let application = responder as? UIApplication {
                application.open(url)
                return true
            }
            responder = responder?.next
        }
        return false
    }
}

class Settings {
    static func set(_ value: Any, forKey key: String) throws {
        let userDefaults = UserDefaults(suiteName: "group.org.reactjs.native.example.onmyown.Share")
        userDefaults?.set(value, forKey: key)
        userDefaults?.synchronize()
    }

    static func get(_ key: String) throws -> Any? {
        let userDefaults = UserDefaults(suiteName: "group.org.reactjs.native.example.onmyown.Share")
        return userDefaults?.object(forKey: key)
    }
}
