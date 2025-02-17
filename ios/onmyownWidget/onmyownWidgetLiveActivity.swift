//
//  onmyownWidgetLiveActivity.swift
//  onmyownWidget
//
//  Created by jejemerong on 2/14/25.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct onmyownWidgetAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic stateful properties about your activity go here!
        var emoji: String
    }

    // Fixed non-changing properties about your activity go here!
    var name: String
}

struct onmyownWidgetLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: onmyownWidgetAttributes.self) { context in
            // Lock screen/banner UI goes here
            VStack {
                Text("Hello \(context.state.emoji)")
            }
            .activityBackgroundTint(Color.cyan)
            .activitySystemActionForegroundColor(Color.black)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                    Text("Leading")
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("Trailing")
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text("Bottom \(context.state.emoji)")
                    // more content
                }
            } compactLeading: {
                Text("L")
            } compactTrailing: {
                Text("T \(context.state.emoji)")
            } minimal: {
                Text(context.state.emoji)
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}

extension onmyownWidgetAttributes {
    fileprivate static var preview: onmyownWidgetAttributes {
        onmyownWidgetAttributes(name: "World")
    }
}

extension onmyownWidgetAttributes.ContentState {
    fileprivate static var smiley: onmyownWidgetAttributes.ContentState {
        onmyownWidgetAttributes.ContentState(emoji: "😀")
     }
     
     fileprivate static var starEyes: onmyownWidgetAttributes.ContentState {
         onmyownWidgetAttributes.ContentState(emoji: "🤩")
     }
}

#Preview("Notification", as: .content, using: onmyownWidgetAttributes.preview) {
   onmyownWidgetLiveActivity()
} contentStates: {
    onmyownWidgetAttributes.ContentState.smiley
    onmyownWidgetAttributes.ContentState.starEyes
}
