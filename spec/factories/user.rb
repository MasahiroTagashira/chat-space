FactoryBot.define do

  factory :user do
    name  {"Faker::Name.last_name"}
    password = Faker::Internet.password(min_length: 8)
    email {Faker::Internet.free_email}
    password {password}
    password_confirmation {password}
  end
end