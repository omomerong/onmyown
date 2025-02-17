//
//  omoWidget.swift
//  omoWidget
//
//  Created by jejemerong on 3/30/24.
//

import WidgetKit
import SwiftUI

@available(iOSApplicationExtension 17.0, *)
struct Provider: AppIntentTimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), count: 2, configuration: ConfigurationAppIntent())
    }

    func snapshot(for configuration: ConfigurationAppIntent, in context: Context) async -> SimpleEntry {
        SimpleEntry(date: Date(), count: 2, configuration: configuration)
    }
    
    func timeline(for configuration: ConfigurationAppIntent, in context: Context) async -> Timeline<SimpleEntry> {
        var entries: [SimpleEntry] = []
        
        // Generate a timeline consisting of five entries an hour apart, starting from the current date.
        let currentDate = Date()
        for hourOffset in 0 ..< 5 {
            let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
            let entry = SimpleEntry(date: entryDate, count: 2, configuration: configuration)
            entries.append(entry)
        }

        return Timeline(entries: entries, policy: .atEnd)
    }
}

@available(iOSApplicationExtension 17.0, *)
struct SimpleEntry: TimelineEntry {
    let date: Date
    let count: Int
    let configuration: ConfigurationAppIntent
}

struct SystemLargeView : View {
    var body: some View {
        VStack(spacing: 30){
            Text("오늘 하루도 열심히 살자-! 💪").font(.title2).bold().padding(20)
            Image("myduck").resizable().frame(width: 50, height: 100)
        }
    }
}

@available(iOSApplicationExtension 17.0, *)
struct onmyownWidgetEntryView : View {
    var entry: Provider.Entry
    
    @Environment(\.widgetFamily) var family

    var body: some View {
        switch family{ // for lockscreen widget
        case .systemLarge:
            SystemLargeView()
            .containerBackground(for: .widget) {
                
            }
        case .systemMedium:
            Gauge(value: 0.7){ Text(entry.date, format: .dateTime.year()
            )}
            .gaugeStyle(.accessoryCircular)
            .containerBackground(for: .widget) {
                Color(red: 0.988, green: 0.416, blue: 0.239, opacity: 1)
            }
//            TODO: streak 수 세기
        case .systemSmall:
            Gauge(value: 0.7){ Text(entry.date, format: .dateTime.year()
            )}
            .gaugeStyle(.accessoryCircular)
            .containerBackground(for: .widget) {
                Color(red: 0.988, green: 0.416, blue: 0.239, opacity: 1)
            }
        case .accessoryCircular:
            Image("omo").resizable().frame(width: 40, height: 55)
                .multilineTextAlignment(.center)
                .foregroundStyle(Color.red, Color.white).containerBackground(for: .widget) {Color(red: 0.988, green: 0.416, blue: 0.239, opacity: 1)}
                .containerBackground(for: .widget) {}
        case .accessoryRectangular:
            Gauge(value: 0.4){ Text(entry.date, format: .dateTime.year()
            )}
            .gaugeStyle(.accessoryCircular)
            .containerBackground(for: .widget) {
                Color(red: 0.988, green: 0.416, blue: 0.239, opacity: 1)
            }
        case .accessoryInline:
            Text("٩( ᐛ )و ")
        default:
            Image("myduck_small")
                .containerBackground(for: .widget) {
            }
//                    Text("Not implemented:")
//                    Text(entry.configuration.favoriteEmoji)
        }
    }
}

@available(iOSApplicationExtension 17.0, *)
struct onmyownWidget: Widget {
    
    let kind: String = "onmyownWidget"
    
    var body: some WidgetConfiguration {
        
        AppIntentConfiguration(kind: kind, intent: ConfigurationAppIntent.self, provider: Provider()){ entry in
          onmyownWidgetEntryView(entry: entry)
                .containerBackground(.fill.tertiary, for: .widget) // for lockscreen widget
        }
#if os(iOS)
        .supportedFamilies([.accessoryInline, .accessoryCircular, .accessoryRectangular, .systemLarge, .systemMedium, .systemSmall]) // for lockscreen widget
#endif
    }
}

@available(iOSApplicationExtension 17.0, *)
extension ConfigurationAppIntent {
    fileprivate static var smiley: ConfigurationAppIntent {
        let intent = ConfigurationAppIntent()
        intent.favoriteEmoji = "😀"
        return intent
    }
    
    fileprivate static var starEyes: ConfigurationAppIntent {
        let intent = ConfigurationAppIntent()
        intent.favoriteEmoji = "🤩"
        return intent
    }
}


@available(iOSApplicationExtension 17.0, *)
struct CircleImage_Previews: PreviewProvider {
    static var previews: some View {
#if os(iOS)
        Group{
          onmyownWidgetEntryView(entry: SimpleEntry(date: .now, count: 2, configuration: .starEyes)).previewContext(WidgetPreviewContext(family: .accessoryCircular)).previewDisplayName("Circular")
          onmyownWidgetEntryView(entry: SimpleEntry(date: .now, count: 2, configuration: .starEyes)).previewContext(WidgetPreviewContext(family: .accessoryRectangular)).previewDisplayName("Rectangular")
          onmyownWidgetEntryView(entry: SimpleEntry(date: .now, count: 2, configuration: .starEyes)).previewContext(WidgetPreviewContext(family: .accessoryInline)).previewDisplayName("Inline")
            
//          onmyownWidgetEntryView(entry: SimpleEntry(date: .now, count: 2, configuration: .starEyes)).previewContext(
//                WidgetPreviewContext(family: .systemSmall))
//          onmyownWidgetEntryView(entry: SimpleEntry(date: .now, count: 2, configuration: .starEyes)).previewContext(WidgetPreviewContext(family: .systemMedium))
//          onmyownWidgetEntryView(entry: SimpleEntry(date: .now, count: 2, configuration: .starEyes)).previewContext(WidgetPreviewContext(family: .systemLarge))
        }
#endif
    }
}

@available(iOSApplicationExtension 17.0, *)
#Preview(as: .systemSmall) {
  onmyownWidget()
} timeline: {
    SimpleEntry(date: .now, count: 2, configuration: .smiley)
    SimpleEntry(date: .now, count: 2,configuration: .starEyes)
}
