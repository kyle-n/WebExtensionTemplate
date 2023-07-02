//
//  AppDelegate.swift
//  iOS (App)
//
//  Created by tester on 5/31/23.
//

import SwiftUI

@main
struct AppView: App {
    var body: some Scene {
        WindowGroup {
            InstructionsView()
        }
    }
}

struct InstructionsView: View {
    var body: some View {
        VStack {
            ForEach(steps, id: \.self) { step in
                Text(step)
                    .font(.body)
            }
        }
    }
    
    private let steps = [
        "Open the Settings app",
        "Tap Safari",
        "Tap Extensions",
        "Tap \(APP_NAME)",
        "Enable \(APP_NAME) in the upper right"
    ]
}
