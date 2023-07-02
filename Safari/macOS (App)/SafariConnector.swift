//
//  SafariConnector.swift
//  REPLACEME (macOS)
//
//  Created by Kyle Nazario on 7/2/23.
//

import Foundation
import SafariServices

enum SafariConnector {
    static func extensionIsEnabled() async -> Bool {
        do {
            return try await withCheckedThrowingContinuation { (continuation: CheckedContinuation<Bool, Error>) in
                SFSafariExtensionManager.getStateOfSafariExtension(withIdentifier: MAC_EXTENSION_BUNDLE_ID) { state, error in
                    if let error {
                        continuation.resume(throwing: error)
                    } else {
                        continuation.resume(returning: state?.isEnabled ?? false)
                    }
                }
            }
        } catch {
            return false
        }
    }
    
    static func openExtensionPrefs() async {
        do {
            return try await withCheckedThrowingContinuation({ continuation in
                SFSafariApplication.showPreferencesForExtension(withIdentifier: MAC_EXTENSION_BUNDLE_ID) { error in
                    if let error {
                        continuation.resume(throwing: error)
                    } else {
                        continuation.resume()
                    }
                }
            })
        } catch {
            return
        }
    }
}
