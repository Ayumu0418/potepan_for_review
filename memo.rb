require "csv" # CSVファイルを扱うためのライブラリを読み込んでいます

puts "1 → 新規でメモを作成する / 2 → 既存のメモを編集する"

memo_type = gets.to_i # ユーザーの入力値を取得し、数字へ変換しています

# if文を使用して続きを作成していきましょう。
if memo_type == 1
  puts "拡張子を除いたファイルを入力してください。"
  new_file_name = gets.chomp
  puts "メモしたい内容を入力してください。"
  puts "完了したらCtrl + Dを押します。"
  memo_contents = STDIN.read.chomp
  CSV.open("#{new_file_name}.csv", 'w') do |f|
    f.puts([memo_contents])
  end
elsif memo_type == 2
  puts "拡張子を除いた既存のファイル名を入力してください。"
  file_name = gets.chomp
  file_path = "#{file_name}.csv"
  if File.exist?("#{file_path}")
    f = File.open("#{file_path}","r") do |d|
      puts "変更内容を入力してください。"
      puts "完了したらCtrl + Dを押します。"
      puts ("編集前のメモ：#{d.read}")
      updated_memo_contents = STDIN.read.chomp
      File.open("#{file_path}","w") do |d|
        d.puts([updated_memo_contents])
      end
    end
  else
    puts "該当のファイルが存在しませんでした。" 
  end 
else
  puts "正しい番号を選んでください。"
end